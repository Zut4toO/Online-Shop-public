const router = require('express').Router();
const productCtrl = require('../controllers/productCtrl');
const auth = require('../middleware/auth');
const authMinAdmin = require('../middleware/authMinAdmin');
const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage({});

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
      return callback(new Error('Only images are allowed'));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
});

router
  .route('/products')
  .get(productCtrl.getProducts)
  .post(auth, authMinAdmin, upload.single('image'), productCtrl.createProduct);

router
  .route('/products/:id')
  .delete(auth, authMinAdmin, productCtrl.deleteProduct)
  .patch(auth, authMinAdmin, upload.single('image'), productCtrl.updateProduct);
/* Extra Toppings */
router
  .route('/extratopping')
  .get(productCtrl.getExtraToppings)
  .post(auth, authMinAdmin, productCtrl.createExtraToppings);
router
  .route('/extratopping/:id')
  .delete(auth, authMinAdmin, productCtrl.deleteExtraToppings)
  .patch(auth, authMinAdmin, productCtrl.updateExtraToppings);
router
  /* Remove Toppings */
  .route('/removetopping')
  .get(productCtrl.getRemoveToppings)
  .post(auth, authMinAdmin, productCtrl.createRemoveToppings);
router
  .route('/removetopping/:id')
  .delete(auth, authMinAdmin, productCtrl.deleteRemoveToppings)
  .patch(auth, authMinAdmin, productCtrl.updateRemoveToppings);
router
  /* Additives Toppings */
  .route('/additive')
  .get(productCtrl.getAdditives)
  .post(auth, authMinAdmin, productCtrl.createAdditives);
router
  .route('/additive/:id')
  .delete(auth, authMinAdmin, productCtrl.deleteAdditives)
  .patch(auth, authMinAdmin, productCtrl.updateAdditives);
module.exports = router;
