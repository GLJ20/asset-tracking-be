const { Asset } = require('../models')

const GetAssets = async (req, res) => {
    try {
        const assets = await Asset.find({})
        res.status(200).send(assets)
    } catch (error) {
        throw error
    }
}

const GetAssetByid = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.assetid)

        if(!asset){
            return res.status(404).send({msg: 'Asset not found!!'})
        }

        res.status(200).send(asset)
    } catch (error) {
        
    }
}
const CreateAsset = async (req, res) => {
    try {
        const asset = await Asset.create({...req.body})
        res.status(200).send(asset)        
    } catch (error) {
        throw error
    }

}

const UpdateAsset = async (req, res) => {
    try {
    const asset = await Asset.findByIdAndUpdate(req.params.assetid, req.body, {
        new: true,
        runValidators: true
    })     
    
    res.status(200).send(asset)
    } catch (error) {
        throw error
    }
}

const DeleteAsset = async (req, res) => {
    try {
        const asset = await Asset.findByIdAndDelete(req.params.assetid)

        if(!asset){
            return res.status(404).send({status: 'Error', msg: 'Asset not found'})
        }

        res.status(200).send({status: "Ok", msg: `Asset with ID ${req.params.assetid} deleted successfully`})
    } catch (error) {
        res.status(500).send({status: 'Error', msg: 'Internal server error'})
    }
}
module.exports = {
    GetAssets,
    GetAssetByid,
    CreateAsset,
    UpdateAsset,
    DeleteAsset
}