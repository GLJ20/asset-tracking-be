const mongoose = require('mongoose')
const userSchema = require('./User')
const assetSchema = require('./Asset')

const User = mongoose.model('User', userSchema)
const Asset = mongoose.model('Asset', assetSchema)

module.exports = {
  User,
  Asset
}