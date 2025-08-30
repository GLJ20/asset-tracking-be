const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const maintenanceLogSchema = require('./maintenanceLogSchema')

const assetSchema = new Schema(
    {
        companyDeviceId: {
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            required: true,
            enum: ['Computer', 'Lab Device', 'Printer', 'Monitor', 'Phone', 'Refrigerator', 'Other']
        },
        brand: {
            type: String,
            trim: true,
            required: false 
        },
        model: {
            type: String,
            trim: true,
            required: false 
        },
        serialNumber: {
            type: String,
            required: true,
            unique: true, 
            trim: true
        },
        purchaseDate: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            required: [true, 'Status is required'],
            enum: ['Active', 'Broken', 'Retired', 'Under Maintenance'],
            default: 'Active'
        },
        location: {
            type: String,
            trim: true,
            required: false 
        },
        department: {
            type: String,
            trim: true,
            required: false 
        },
        notes: {
            type: String,
            trim: true,
            required: false 
        },
        color: {
            type: String,
            trim: true,
            required: false 
        },
        attachments: {
            type: [String], 
            required: false,
            default: []
        },
        assignedTo: {
            type: mongoose.Types.ObjectId, 
            ref: 'User', 
            required: true
        },      
        maintenanceLogs: {
            type: [maintenanceLogSchema],
            default: []
        }          
    }, { timestamps: true}
)

module.exports = assetSchema