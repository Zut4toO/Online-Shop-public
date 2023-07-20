const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    number: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String },
    cloudinary_id: { type: String },
    variants: { type: Array, required: true },
    selectedToppings: { type: Array },
    selectedRemovedToppings: { type: Array },
    selectedAdditives: { type: Array },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Products', productSchema);
