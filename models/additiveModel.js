const mongoose = require('mongoose');

const additive = new mongoose.Schema({
  additiveID: { type: String, trim: true, required: true },
  additive: { type: Array, trim: true, required: true },
});

module.exports = mongoose.model('additives', additive);
