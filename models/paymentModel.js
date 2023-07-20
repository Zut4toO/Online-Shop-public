const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: false,
    },
    street: {
      type: String,
      required: true,
    },
    streetNumber: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    telefon: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    delivery: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    paymentID: {
      type: String,
      //required: true,
    },
    cartItems: {
      type: Array,
      default: [],
    },
    carttotal: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      default: false,
    },
    cancelation: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Payments', paymentSchema);
