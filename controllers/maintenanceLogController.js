const { Asset } = require('../models')

const GetAssetMaintenanceLogs = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.assetid).select('maintenanceLogs')

        if (!asset){
            return res.status(404).send({status: 'Error', msg: "No Asset"})
        }

        const maintenanceLogs = asset.maintenanceLogs

        maintenanceLogs.sort((a,b) => new Date(b.maintenanceDate) - new Date(a.maintenanceDate))

        res.status(200).send(maintenanceLogs)
    } catch (error) {
        res.status(500).send({ status: 'Error', msg: 'No logs' })
    }
}

const AddMaintenanceLog = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.assetid)

        if(!asset){
            return res.status(404).send({status: 'Error', msg: "No Asset"})
        }

        asset.maintenanceLogs.push(req.body)
        await asset.save()
        res.status(201).send(asset)
    } catch (error) {
        res.status(500).send({ status: 'Error', msg: 'Failed to add maintenance log.' })     
    }
}

const UpdateMaintenanceLog = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.assetid)

        if(!asset){
            return res.status(404).send({status: 'Error', msg: "No Asset"})
        }

        const log = asset.maintenanceLogs.id(req.params.logid)

        if(!log){
            return res.status(404).send({status: 'Error', msg: 'No log found'})
        }

        log.set(req.body)

        await asset.save()

        res.status(200).send(asset)
    } catch (error) {
        res.status(500).send({ status: 'Error', msg: 'Failed to update maintenance log.' })        
    }
}

const DeleteMaintenanceLog = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.assetid)
        
        if(!asset){
            return res.status(404).send({status: 'Error', msg: "No Asset"})
        }

        const log = asset.maintenanceLogs.id(req.params.logid)

        if(!log){
            return res.status(404).send({status: 'Error', msg: 'No log found'})
        }

        log.deleteOne()

        await asset.save()

        res.status(200).send({status: 'Ok', msg: 'Log Deleted'})
    } catch (error) {
        res.status(500).send({ status: 'Error', msg: 'Failed to delete maintenance log.' })
    }
}
module.exports = {
    GetAssetMaintenanceLogs,
    AddMaintenanceLog,
    UpdateMaintenanceLog,
    DeleteMaintenanceLog   
}