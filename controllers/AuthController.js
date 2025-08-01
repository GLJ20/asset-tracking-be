const { User } = require('../models')
const middleware = require('../middleware')

const Register = async (req, res) => {
    try {
        const {username, password, name, department, role} = req.body 

        let passwordDigest = await middleware.hashPassword(password)

        let existingUser = await User.findOne({ username })

        if(existingUser){
            return res.status(400).send('A user with that username has already been registered!')
        } else{
            const user = await User.create({name, passwordDigest, username, department, role})

            res.status(200).send(user)
        }
    } catch (error) {
        throw error
    }
}

const Login = async (req, res) => {
  try {
    // Extracts the necessary fields from the request body
    const { username, password } = req.body
    // Finds a user by a particular field (in this case, username)
    const user = await User.findOne({ username })

    if (!user){
        return res.status(401).send({ status: 'Error', msg: 'User not found'})
    }
    // Checks if the password matches the stored digest
    let matched = await middleware.comparePassword(
      password,
      user.passwordDigest
    )
    // If they match, constructs a payload object of values we want on the front end
    if (matched) {
      let payload = {
        id: user.id,
        email: user.email,
        name: user.name
      }
      // Creates our JWT and packages it with our payload to send as a response
      let token = middleware.createToken(payload)
      return res.status(200).send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred logging in!' })
  }
}

const UpdatePassword = async (req, res) => {
  try {
    // Extracts the necessary fields from the request body
    const { oldPassword, newPassword } = req.body
    // Finds a user by a particular field (in this case, the user's id from the URL param)
    let user = await User.findById(req.params.id)
    // Checks if the password matches the stored digest
    let matched = await middleware.comparePassword(
      oldPassword,
      user.passwordDigest
    )
    // If they match, hashes the new password, updates the db with the new digest, then sends the user as a response
    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword)

      user = await User.findByIdAndUpdate(req.params.id, {
        passwordDigest,
        new: true
      })
      let payload = {
        id: user._id,
        username: username
      }
      return res.status(200).send({ status: 'Password Updated!', user: payload })
    }
    res.status(401).send({ status: 'Error', msg: 'Old Password did not match!' })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred updating password!'
    })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0")
  res.setHeader("Pragma", "no-cache")
  res.setHeader("Expires", "0")
  res.status(200).send(payload)
}

module.exports = {
    Register,
    Login,
    UpdatePassword,
    CheckSession
}