const router = require('express').Router();
const categoryCtrl = require('../controllers/categoryCtrl');
const auth = require('../middleware/auth');
const authMinAdmin = require('../middleware/authMinAdmin');

router
  .route('/category')
  .get(categoryCtrl.getCategories)
  .post(auth, authMinAdmin, categoryCtrl.createCategory);

router
  .route('/category/:id')
  .delete(auth, authMinAdmin, categoryCtrl.deleteCategory)
  .put(auth, authMinAdmin, categoryCtrl.updateCategory);

module.exports = router;
