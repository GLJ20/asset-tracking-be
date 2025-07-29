const { User } = require('../models')
const middleware = require('../middleware')

const Register = async (req, res) => {
    try {
        const {username, password, name} = req.body 

        let passwordDigest = await middleware.hashPassword(password)

        let existingUser = await User.findOne({ username })

        if(existingUser){
            return res.status(400).send('A user with that username has already been registered!')
        } else{
            const user = await User.create({name, passwordDigest, username})

            res.status(200).send(user)
        }
    } catch (error) {
        throw error
    }
}