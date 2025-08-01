const { Schema } = require('mongoose');

const maintenanceLogSchema = new Schema(
    {
        maintenanceDate: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        performedBy: {
            type: String,
            trim: true,
            required: true 
        },
        cost: {
            type: Number,
            required: true, 
            min: 0,
        },
        notes: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true 
    }
);

module.exports = maintenanceLogSchema; 