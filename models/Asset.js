const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const maintenanceLogSchema = require('./maintenanceLogSchema')

const assetSchema = new Schema(
    {
        companyDeviceId: {
            type: String,
            require: true,
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
            enum: [
                'Laptop', 'Monitor', 'Desktop', 'Tablet', 'Smartphone', 
                '3D Printer', 'Milling Machine', 'Vacuum Former', 'Furnace', 'Scanner', 
                'Other' 
            ]
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
            enum: ['In Use', 'Available', 'In Repair', 'Retired', 'Lost'],
            default: 'In Use'
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