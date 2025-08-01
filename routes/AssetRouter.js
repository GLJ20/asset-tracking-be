const router = require('express').Router()
const controller = require('../controllers/AssetController')
const middleware = require('../middleware')
const maintenanceLogRouter = require('./maintenanceLogRouter')

//routes for assets
router.post("/", controller.CreateAsset)
router.get("/", controller.GetAssets)
router.get("/:assetid", controller.GetAssetByid)
router.put("/:assetid", controller.UpdateAsset)
router.delete("/:assetid", controller.DeleteAsset)

//routes for maintenance
router.use("/:assetid/maintenancelogs", maintenanceLogRouter)
module.exports = router