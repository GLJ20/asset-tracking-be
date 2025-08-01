const router = require('express').Router({mergeParams: true})
const maintenanceLogController = require('../controllers/maintenanceLogController');
const middleware = require('../middleware')

router.post('/', 
    middleware.stripToken,
    middleware.verifyToken,    
    maintenanceLogController.AddMaintenanceLog)
router.get('/', 
    middleware.stripToken,
    middleware.verifyToken,    
    maintenanceLogController.GetAssetMaintenanceLogs)
router.put('/:logid', 
    middleware.stripToken,
    middleware.verifyToken,    
    maintenanceLogController.UpdateMaintenanceLog)
router.delete('/:logid', 
    middleware.stripToken,
    middleware.verifyToken,    
    maintenanceLogController.DeleteMaintenanceLog)

module.exports = router
