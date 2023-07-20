const mongoose = require('mongoose');

const subscriptionAmountSchema = new mongoose.Schema(
  {
    subscriptionAmount: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('subscriptionAmount', subscriptionAmountSchema);
