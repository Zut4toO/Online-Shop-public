const Category = require('../models/categoryModel');

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      // Try to find in DB
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      // if user have role = 1 ---> admin
      // only admin can create , delete and update category
      // ES6: const name = req.body.name; Can be written as: const {name} = req.body
      const { value, label } = req.body;
      // Find category
      const category = await Category.findOne({ name: label });
      // Check if already exist
      if (category)
        return res
          .status(400)
          .json({ msg: 'Diese Kategorie existiert bereits' });
      const newCategory = new Category({
        name: label,
        category: [{ value: value, label: label }],
      });
      // If not save new category
      await newCategory.save();
      // Response success
      res.json({ msg: 'Kategorie erfolgreich erstellt' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      // Find Category by Id and delete
      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Kategorie erfolgreich gelöscht' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      // ES6: const name = req.body.name; Can be written as: const {name} = req.body
      const { value, label } = req.body;
      // Find category by Id and update with new name
      await Category.findOneAndUpdate(
        { _id: req.params.id },
        {
          name: label,
          category: [{ value: value, label: label }],
        }
      );

      res.json({ msg: 'Kategorie erfolgreich aktualisiert' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryCtrl;
