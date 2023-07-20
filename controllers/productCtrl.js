const Products = require('../models/productModel');
const ToppingExtras = require('../models/toppingExtraModel');
const ToppingRemove = require('../models/toppingRemoveModel');
const Additives = require('../models/additiveModel');
const cloudinary = require('../utils/cloudinary');

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      /* Products.find({}).then((products) => {
        res.send(products);

        .then is maybe better than async await for node.js
        bcs whole server will pause until await is done
        async would need to be removed
      }); */
      const products = await Products.find({});
      res.send(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    let image;
    let cloudinary_id;
    try {
      let number = JSON.parse(req.body.product).number;
      let name = JSON.parse(req.body.product).name;
      let category = JSON.parse(req.body.product).category;
      let variants = JSON.parse(req.body.variants);
      let selectedToppings = JSON.parse(req.body.selectedToppings);
      let selectedRemovedToppings = JSON.parse(
        req.body.selectedRemovedToppings
      );
      let selectedAdditives = JSON.parse(req.body.selectedAdditives);

      if (req.file?.path != undefined) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: `${process.env.CLIENT_URL}/product`,
          width: 512,
          height: 512,
          crop: 'fill',
        });
        image = result.secure_url;
        cloudinary_id = result.public_id;
      }

      try {
        const product = await Products.findOne({ name });
        if (product)
          return res
            .status(400)
            .json({ msg: 'Dieses Produkt existiert bereits' });

        const newProduct = new Products({
          number,
          name,
          variants,
          selectedToppings,
          selectedRemovedToppings,
          selectedAdditives,
          image,
          cloudinary_id,
          category,
        });
        await newProduct.save();
      } catch (mongoErr) {
        if (req.file?.path != undefined) {
          try {
            await cloudinary.uploader.destroy(cloudinary_id);
          } catch (imageDeleteError) {
            return res.status(500).json({ msg: imageDeleteError.message });
          }
        }
        return res.status(500).json({ msg: mongoErr.message });
      }

      res.json({ msg: 'Produkt wurde erstellt' });
    } catch (imageUploadError) {
      return res.status(500).json({ msg: imageUploadError.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      let result = await Products.findOne({ _id: req.params.id });
      console.log(result);
      if (result?.cloudinary_id != undefined) {
        try {
          await cloudinary.uploader.destroy(result.cloudinary_id);
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      }
      try {
        await Products.findByIdAndDelete(req.params.id);
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
      res.json({ msg: 'Produkt erfolgreich gelöscht' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    let cloudinary_id;
    try {
      let checkImage = req.file?.filename;
      let number = JSON.parse(req.body.product).number;
      let name = JSON.parse(req.body.product).name;
      let category = JSON.parse(req.body.product).category;
      let variants = JSON.parse(req.body.variants);
      let selectedToppings = JSON.parse(req.body.selectedToppings);
      let selectedRemovedToppings = JSON.parse(
        req.body.selectedRemovedToppings
      );
      let selectedAdditives = JSON.parse(req.body.selectedAdditives);

      let product = await Products.findOne({ _id: req.params.id });
      product.number = number;
      product.name = name;
      product.variants = variants;
      product.selectedToppings = selectedToppings;
      product.selectedRemovedToppings = selectedRemovedToppings;
      product.selectedAdditives = selectedAdditives;
      product.category = category;

      if (checkImage) {
        if (product.image) {
          try {
            await cloudinary.uploader.destroy(product.cloudinary_id);
          } catch {
            return res.status(500).json({ msg: err.message });
          }
        }
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: `${process.env.CLIENT_URL}/product`,
          width: 512,
          height: 512,
          crop: 'fill',
        });

        product.image = result.secure_url;
        cloudinary_id = result.public_id;
        product.cloudinary_id = cloudinary_id;
      }
      product.save();

      res.json({ msg: 'Produkt wurde aktualisiert' });
    } catch (err) {
      if (req.file?.path != undefined) {
        try {
          await cloudinary.uploader.destroy(cloudinary_id);
        } catch {
          return res.status(500).json({ msg: err.message });
        }
      }
      return res.status(500).json({ msg: err.message });
    }
  },

  /* Extra toppings */
  getExtraToppings: async (req, res) => {
    try {
      // Try to find in DB
      const toppingExtras = await ToppingExtras.find();
      res.json(toppingExtras);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createExtraToppings: async (req, res) => {
    try {
      // if user have role = 1 ---> admin
      // only admin can create , delete and update category
      // ES6: const label = req.body.label; Can be written as: const {label} = req.body
      const { label, value, number } = req.body;
      // Find Topping
      const toppingExtra = await ToppingExtras.findOne({ extraID: label });
      // Check if already exist
      if (toppingExtra)
        return res.status(400).json({ msg: 'Dieses Extra existiert bereits' });
      const newToppingExtra = new ToppingExtras({
        extraID: label,
        extra: [{ value: value, label: label }],
        extraNumber: [{ value: number, label: label }],
      });
      // If not save new category
      await newToppingExtra.save();
      // Response success
      res.json({ msg: 'Extra erfolgreich erstellt' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteExtraToppings: async (req, res) => {
    try {
      // Find Topping by Id and delete
      await ToppingExtras.findByIdAndDelete(req.params.id);
      console.log('delete id', req.params.id);
      res.json({ msg: 'Extra erfolgreich gelöscht' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateExtraToppings: async (req, res) => {
    try {
      // ES6: const label = req.body.label; Can be written as: const {label} = req.body
      const { value, label, number } = req.body;
      // Find Topping by Id and update with new label
      await ToppingExtras.findOneAndUpdate(
        { _id: req.params.id },
        {
          extraID: label,
          extra: [{ value: value, label: label }],
          extraNumber: [{ value: number, label: label }],
        }
      );

      res.json({ msg: 'Extra erfolgreich aktualisiert' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  /* Topping remove */
  getRemoveToppings: async (req, res) => {
    try {
      // Try to find in DB
      const toppingRemove = await ToppingRemove.find();
      res.json(toppingRemove);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createRemoveToppings: async (req, res) => {
    try {
      // if user have role = 1 ---> admin
      // only admin can create , delete and update category
      // ES6: const label = req.body.label; Can be written as: const {label} = req.body
      const { value, label } = req.body;
      // Find Toppings
      const toppingRemove = await ToppingRemove.findOne({ removeID: label });
      // Check if already exist
      if (toppingRemove)
        return res.status(400).json({ msg: 'Diese Abwahl existiert bereits' });
      const newToppingRemove = new ToppingRemove({
        removeID: label,
        removed: [{ value: value, label: label }],
      });
      // If not save new Topping
      await newToppingRemove.save();
      // Response success
      res.json({ msg: 'Abwahl erfolgreich erstellt' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteRemoveToppings: async (req, res) => {
    try {
      // Find Topping by Id and delete
      await ToppingRemove.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Abwahl erfolgreich gelöscht' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateRemoveToppings: async (req, res) => {
    try {
      // ES6: const label = req.body.label; Can be written as: const {label} = req.body
      const { value, label } = req.body;
      // Find Topping by Id and update with new label
      await ToppingRemove.findOneAndUpdate(
        { _id: req.params.id },
        { removeID: label, removed: [{ value: value, label: label }] }
      );

      res.json({ msg: 'Abwahl erfolgreich aktualisiert' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  /* Additives */
  getAdditives: async (req, res) => {
    try {
      // Try to find in DB
      const additives = await Additives.find();
      res.json(additives);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createAdditives: async (req, res) => {
    try {
      // if user have role = 1 ---> admin
      // only admin can create , delete and update category
      // ES6: const label = req.body.label; Can be written as: const {label} = req.body
      const { value, label } = req.body;
      // Find Additives
      const additive = await Additives.findOne({ additiveID: label });
      // Check if already exist
      if (additive)
        return res.status(400).json({ msg: 'Zusatzstoff existiert bereits' });
      const newAdditives = new Additives({
        additiveID: label,
        additive: [{ value: value, label: label }],
      });
      // If not save new Additives
      await newAdditives.save();
      // Response success
      res.json({ msg: 'Zusatzstoff erfolgreich erstellt' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteAdditives: async (req, res) => {
    try {
      // Find Additives by Id and delete
      await Additives.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Zusatzstoff erfolgreich gelöscht' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateAdditives: async (req, res) => {
    try {
      // ES6: const label = req.body.label; Can be written as: const {label} = req.body
      const { value, label } = req.body;
      // Find Additives by Id and update with new label
      await Additives.findOneAndUpdate(
        { _id: req.params.id },
        {
          additiveID: label,
          additive: [{ value: value, label: label }],
        }
      );

      res.json({ msg: 'Zusatzstoff erfolgreich aktualisiert' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productCtrl;
