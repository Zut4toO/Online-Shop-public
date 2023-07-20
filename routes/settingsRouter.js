const router = require('express').Router();
const settingsCtrl = require('../controllers/settingsCtrl');
const auth = require('../middleware/auth');
const authMasterAdmin = require('../middleware/authMasterAdmin');
const authMinAdmin = require('../middleware/authMinAdmin');
const authMinSupport = require('../middleware/authMinSupport');
const multer = require('multer');
const path = require('path');
const printerCtrl = require('../controllers/printerCtrl');

const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (
      ext !== '.png' &&
      ext !== '.PNG' &&
      ext !== '.jpg' &&
      ext !== '.JPG' &&
      ext !== '.jpeg' &&
      ext !== '.JPEG' &&
      ext !== '.heic' &&
      ext !== '.HEIC' &&
      ext !== '.heif' &&
      ext !== '.HEIF'
    ) {
      return callback(new Error('Only images are allowed' + ext), false);
    }
    callback(null, true);
  },
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
});

router
  .route('/settings')
  .patch(
    auth,
    authMinAdmin,
    upload.fields([
      { name: 'brandImage', maxCount: 1 },
      { name: 'bgImage', maxCount: 1 },
    ]),
    settingsCtrl.patchSettings
  )
  .get(settingsCtrl.getSettings);

router
  .route('/deliveryTimeSettings')
  .patch(auth, authMinSupport, settingsCtrl.patchDeliveryTimeSettings)
  .get(settingsCtrl.getSettings);

router
  .route('/printerip')
  .patch(auth, authMasterAdmin, settingsCtrl.patchPrinterIP)
  .get(auth, authMinSupport, settingsCtrl.getPrinterIP);

router
  .route('/checkprinteronline')
  .get(auth, authMinSupport, printerCtrl.checkPrinterOnline);

module.exports = router;
