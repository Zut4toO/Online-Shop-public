const mongoose = require('mongoose');

const subscriptionHistorySchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    subscriptionID: {
      type: String,
    },
    amount: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'subscriptionHistory',
  subscriptionHistorySchema
);
