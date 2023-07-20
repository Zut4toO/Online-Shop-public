const router = require('express').Router();
const galeryCtrl = require('../controllers/galeryCtrl');
const auth = require('../middleware/auth');
const authMinAdmin = require('../middleware/authMinAdmin');
const multer = require('multer');
const path = require('path');

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
      return callback(new Error('Only images are allowed'), false);
    }
    callback(null, true);
  },
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
});

router
  .route('/galery')
  .get(galeryCtrl.getGaleries)
  .post(auth, authMinAdmin, upload.single('image'), galeryCtrl.createGalery);

router.route('/galery/:id').delete(auth, authMinAdmin, galeryCtrl.deleteGalery);

module.exports = router;
