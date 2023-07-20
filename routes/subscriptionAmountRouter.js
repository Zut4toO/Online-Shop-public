const router = require('express').Router();
const subscriptionAmountCtrl = require('../controllers/subscriptionAmountCtrl');
const auth = require('../middleware/auth');
const authMinAdmin = require('../middleware/authMinAdmin');
const authMasterAdmin = require('../middleware/authMasterAdmin');

router
  .route('/subscriptionamount')
  .get(auth, authMinAdmin, subscriptionAmountCtrl.getSubAmount)
  .put(auth, authMasterAdmin, subscriptionAmountCtrl.updateSubAmount);

router
  .route('/activesubscription')
  .get(subscriptionAmountCtrl.getActiveSub)
  .put(auth, authMasterAdmin, subscriptionAmountCtrl.updateActiveSub);

module.exports = router;
