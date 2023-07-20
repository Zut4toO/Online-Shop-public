const mongoose = require('mongoose');

const paypalWebhookDataSchema = new mongoose.Schema(
  {
    data: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('paypalwebhookdata', paypalWebhookDataSchema);
