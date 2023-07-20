const mongoose = require('mongoose');

const toppingExtra = new mongoose.Schema({
  extraID: { type: String, trim: true, required: true },
  extra: { type: Array, trim: true, required: true },
  extraNumber: { type: Array, trim: true, required: true },
});

module.exports = mongoose.model('ToppingExtras', toppingExtra);
