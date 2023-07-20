const mongoose = require('mongoose');

const galerySchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    cloudinary_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Galery', galerySchema);
