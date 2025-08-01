const router = require('express').Router({mergeParams: true})
const maintenanceLogController = require('../controllers/maintenanceLogController');
const middleware = require('../middleware')

router.post('/', maintenanceLogController.AddMaintenanceLog)
router.get('/', maintenanceLogController.GetAssetMaintenanceLogs)
router.put('/:logid', maintenanceLogController.UpdateMaintenanceLog)
router.delete('/:logid', maintenanceLogController.DeleteMaintenanceLog)

module.exports = router
