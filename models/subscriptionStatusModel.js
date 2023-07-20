const mongoose = require('mongoose');

const subscriptionStatusSchema = new mongoose.Schema(
  {
    subscriptionID: {
      type: String,
      required: true,
    },
    subscriptionStatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('subscriptionStatus', subscriptionStatusSchema);
