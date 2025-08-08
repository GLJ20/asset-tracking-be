const { Asset } = require('../models')

const GetAssets = async (req, res) => {
    try {
        const userId = res.locals.payload.id
        const userRole = res.locals.payload.role 

        if(userRole === 'Admin'){
            const assets = await Asset.find({}).populate('assignedTo')
            res.status(200).send(assets)
        } else{
            const assets = await Asset.find({assignedTo: userId}).populate('assignedTo')
            res.status(200).send(assets)
        }
        
    } catch (error) {
        throw error
    }
}

const GetAssetByid = async (req, res) => {
    try {
        const userId = res.locals.payload.id
        const userRole = res.locals.payload.role 

        const asset = await Asset.findById(req.params.assetid).populate('assignedTo')

        if(!asset){
            return res.status(404).send({msg: 'Asset not found!!'})
        }

        if(userRole === 'Admin' || asset.assignedTo.toString() === userId){
            res.status(200).send(asset)
        } else {
            res.status(403).send({status: 'Error', msg: 'Access denied'})
        }
        
    } catch (error) {
        res.status(500).send({status: 'Error', msg: 'Internal server error'})
    }
}
const CreateAsset = async (req, res) => {
    try {
        const userId = res.locals.payload.id
        const asset = await Asset.create({...req.body, assignedTo: userId})
        res.status(200).send(asset)        
    } catch (error) {
        throw error
    }

}

const UpdateAsset = async (req, res) => {
    try {
    const userId = res.locals.payload.id
    const userRole = res.locals.payload.role

    const asset = await Asset.findById(req.params.assetid)
    
    if(!asset){
            return res.status(404).send({status: 'Error', msg: 'Asset not found'})
    }

    if(userRole === 'Admin' || asset.assignedTo.toString() === userId){
        const asset = await Asset.findByIdAndUpdate(req.params.assetid, req.body, {
        new: true,
        runValidators: true
      }) 
      res.status(200).send(asset)
    } else{
        res.status(403).send({status: 'Error', msg: 'Access denied'})
    }
    
    } catch (error) {
        throw error
    }
}

const DeleteAsset = async (req, res) => {
    try {
        const userId = res.locals.payload.id
        const userRole = res.locals.payload.role

        const asset = await Asset.findById(req.params.assetid)

        if(!asset){
            return res.status(404).send({status: 'Error', msg: 'Asset not found'})
        }

        if(userRole === 'Admin' || asset.assignedTo.toString() === userId){
            const asset = await Asset.findByIdAndDelete(req.params.assetid)
            res.status(200).send({status: "Ok", msg: `Asset with ID ${req.params.assetid} deleted successfully`})
        } else{
        res.status(403).send({status: 'Error', msg: 'Access denied'})
        }
        
        
        
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