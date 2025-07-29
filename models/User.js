const { Schema } = require('mongoose')

const userSchema = new Schema(
    {
        name: {
            type: String, 
            required: true,
            trim: true,
            lowercase: true
        },
        username: {
            type: String, 
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        passwordDigest: {
            type: String, 
            required: true,
        },
        department: {
            type: String, 
            required: true
        },
        role: {
            type: String,
            enum: ['Admin', 'Employee'],
            default: 'Employee',
            required: true
        }
    },
    { timestamps: true }
)

module.exports = userSchema