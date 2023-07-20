const mongoose = require('mongoose');

const toppingRemove = new mongoose.Schema(
  {
    removeID: { type: String, trim: true, required: true },
    removed: { type: Array, trim: true, required: true },
    removedNumber: { type: Array, trim: true, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ToppingRemove', toppingRemove);
