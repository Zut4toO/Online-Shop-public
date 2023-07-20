const router = require('express').Router();
const feeSettingsCtrl = require('../controllers/feeSettingsCtrl');
const auth = require('../middleware/auth');
const authMinAdmin = require('../middleware/authMinAdmin');
const authMasterAdmin = require('../middleware/authMasterAdmin');

router
  .route('/feesettings')
  .get(auth, authMinAdmin, feeSettingsCtrl.getFeeSettings)
  .put(auth, authMasterAdmin, feeSettingsCtrl.updateFeeSettings);

module.exports = router;
