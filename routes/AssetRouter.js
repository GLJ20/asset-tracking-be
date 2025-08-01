const router = require('express').Router()
const controller = require('../controllers/AssetController')
const middleware = require('../middleware')
const maintenanceLogRouter = require('./maintenanceLogRouter')

//routes for assets
router.post("/", 
    middleware.stripToken,
    middleware.verifyToken,
    controller.CreateAsset)
router.get("/", 
    middleware.stripToken,
    middleware.verifyToken,    
    controller.GetAssets)
router.get("/:assetid", 
    middleware.stripToken,
    middleware.verifyToken,    
    controller.GetAssetByid)
router.put("/:assetid", 
    middleware.stripToken,
    middleware.verifyToken,    
    controller.UpdateAsset)
router.delete("/:assetid", 
    middleware.stripToken,
    middleware.verifyToken,    
    controller.DeleteAsset)

//routes for maintenance
router.use("/:assetid/maintenancelogs", maintenanceLogRouter)
module.exports = router