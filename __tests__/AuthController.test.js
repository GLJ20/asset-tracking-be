// Mock the dependencies FIRST, before any imports
jest.mock('../models', () => ({
    User: {
        findOne: jest.fn(),
        create: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn()
    }
}));

jest.mock('../middleware', () => ({
    hashPassword: jest.fn(),
    comparePassword: jest.fn(),
    createToken: jest.fn()
}));

// Now import everything
const { Register, Login, UpdatePassword } = require('../controllers/AuthController')
const { User } = require('../models')
const middleware = require('../middleware')

describe('AuthController', () => {
    let req, res

    beforeEach(() => {
        jest.clearAllMocks()

        req = {
            body: {},
            params: {}
        }
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
    })

    describe('Register', () => {
        it('should register a new user successfully', async () => {
            req.body = {
                username: 'testuser',
                password: 'password123',
                name: "test",
                department: 'IT',
                role: 'Employee'

            }

            middleware.hashPassword.mockResolvedValue('hashedpassword123')
            User.findOne.mockResolvedValue(null)
            User.create.mockResolvedValue({
                id: "123",
                username: 'testuser',
                name: 'test'
            })

            await Register(req, res)

            expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser'})
            expect(User.create).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(200)
        })

        it('should reject reg if user already exist', async () => {
            req.body = { username: 'existinguser', password: 'pass' }

            User.findOne.mockResolvedValue({ username: 'existinguser' })

            await Register(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.send).toHaveBeenCalledWith('A user with that username has already been registered!')
        })
    })

    describe('Login', () => {
        it('should login user with correct credentials', async () => {
            req.body = { username: 'testuser', password: 'password123'}

            const mockUser = {
              id: '123',    
              username: 'testuser',
              name: 'test',
              email: 'test@example.com',
              passwordDigest: 'hashedpassword'
            }

            User.findOne.mockResolvedValue(mockUser)
            middleware.comparePassword.mockResolvedValue(true)
            middleware.createToken.mockReturnValue('fake-jwt-token')

            await Login(req, res)

            expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' })
            expect(middleware.comparePassword).toHaveBeenCalledWith('password123', 'hashedpassword')
            expect(res.status).toHaveBeenCalledWith(200)
        })

        it('should reject login with wrong pass', async () => {
          req.body = { username: 'testuser', password: 'wrongpassword' }

          User.findOne.mockResolvedValue({ passwordDigest: 'hashedpassword' })
          middleware.comparePassword.mockResolvedValue(false)

          await Login(req, res)

          expect(res.status).toHaveBeenCalledWith(401)
        })
    })
})