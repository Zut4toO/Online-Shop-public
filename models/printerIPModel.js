const mongoose = require('mongoose');

const printerSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('printerIP', printerSchema);
