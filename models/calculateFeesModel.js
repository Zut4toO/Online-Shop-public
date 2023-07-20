const mongoose = require('mongoose');

const calculateFeeSchema = new mongoose.Schema(
  {
    monthYear: {
      type: String,
      unique: true,
    },
    total: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('CalculatedFees', calculateFeeSchema);
