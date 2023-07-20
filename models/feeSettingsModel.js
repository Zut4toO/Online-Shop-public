const mongoose = require('mongoose');

const feeSettingsSchema = new mongoose.Schema(
  {
    fixpreisStatus: {
      type: Array,
      required: true,
      trim: true,
    },
    fixpreisAmount: {
      type: Number,
      required: true,
      trim: true,
    },
    serviceFeeUntil: {
      type: Number,
      required: true,
      trim: true,
    },
    serviceAmount: {
      type: Number,
      required: true,
      trim: true,
    },
    firstLevelAmount: {
      type: Number,
      required: true,
    },
    firstLevelProvision: {
      type: Number,
      required: true,
    },
    secondLevelAmount: {
      type: Number,
      required: true,
    },
    secondLevelProvision: {
      type: Number,
      required: true,
    },
    thirdLevelAmount: {
      type: Number,
      required: true,
    },
    thirdLevelProvision: {
      type: Number,
      required: true,
    },
    fourthLevelAmount: {
      type: Number,
      required: true,
    },
    fourthLevelProvision: {
      type: Number,
      required: true,
    },
    fifthLevelAmount: {
      type: Number,
      required: true,
    },
    fifthLevelProvision: {
      type: Number,
      required: true,
    },
    sixthLevelAmount: {
      type: Number,
      required: true,
    },
    sixthLevelProvision: {
      type: Number,
      required: true,
    },
    seventhLevelAmount: {
      type: Number,
      required: true,
    },
    seventhLevelProvision: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('feesettings', feeSettingsSchema);
