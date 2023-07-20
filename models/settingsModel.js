const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: false,
    trim: true,
  },
  brandImage: {
    type: String,
    required: false,
  },
  brandCloudinary_id: {
    type: String,
    required: false,
  },
  bgImage: {
    type: String,
    required: false,
  },
  bgCloudinary_id: {
    type: String,
    required: false,
  },
  color: {
    type: Array,
    required: false,
    trim: true,
  },
  street: {
    type: String,
    required: false,
    trim: true,
  },
  streetNumber: {
    type: String,
    required: false,
    trim: true,
  },
  zipCode: {
    type: String,
    required: false,
    trim: true,
  },
  city: {
    type: String,
    required: false,
    trim: true,
  },
  telefon: {
    type: String,
    required: false,
    trim: true,
  },
  companyname: {
    type: String,
    required: false,
    trim: true,
  },
  ceo: {
    type: String,
    required: false,
    trim: true,
  },
  authority: {
    type: String,
    required: false,
    trim: true,
  },
  ustid: {
    type: String,
    required: false,
    trim: true,
  },
  mapsLink: {
    type: String,
    required: false,
    trim: true,
  },
  facebook: {
    type: String,
    required: false,
    trim: true,
  },
  instagram: {
    type: String,
    required: false,
    trim: true,
  },
  notification: {
    type: Array,
    required: false,
    trim: true,
  },
  notificationMail: {
    type: String,
    required: false,
    trim: true,
  },
  payments: {
    type: Array,
    required: false,
    trim: true,
  },
  delivery: {
    type: Array,
    required: false,
    trim: true,
  },
  merchantID: {
    type: String,
    required: false,
    trim: true,
  },
  minDeliveryAmount: {
    type: Number,
    required: false,
    trim: true,
  },
  minPayPalAmount: {
    type: Number,
    required: false,
    trim: true,
  },
  deliveryFirstDistance: {
    type: Number,
    required: false,
    trim: true,
  },
  deliveryFirstPrice: {
    type: Number,
    required: false,
    trim: true,
  },
  deliverySecondDistance: {
    type: Number,
    required: false,
    trim: true,
  },
  deliverySecondPrice: {
    type: Number,
    required: false,
    trim: true,
  },
  deliveryThirdDistance: {
    type: Number,
    required: false,
    trim: true,
  },
  deliveryThirdPrice: {
    type: Number,
    required: false,
    trim: true,
  },
  isClosed: {
    type: Array,
    required: false,
    trim: true,
  },
  minBeforeClosing: {
    type: Number,
    required: false,
    trim: true,
  },
  minimalCollectTime: {
    type: Number,
    required: false,
    trim: true,
  },
  minimalDeliveryTime: {
    type: Number,
    required: false,
    trim: true,
  },
  isClosedMonday: {
    type: Array,
    required: false,
    trim: true,
  },
  openMonday: {
    type: String,
    required: false,
    trim: true,
  },
  closeMonday: {
    type: String,
    required: false,
    trim: true,
  },
  startPauseMonday: {
    type: String,
    required: false,
    trim: true,
  },
  endPauseMonday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryOpenMonday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryCloseMonday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryStartPauseMonday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryEndPauseMonday: {
    type: String,
    required: false,
    trim: true,
  },
  isClosedTuesday: {
    type: Array,
    required: false,
    trim: true,
  },
  openTuesday: {
    type: String,
    required: false,
    trim: true,
  },
  closeTuesday: {
    type: String,
    required: false,
    trim: true,
  },
  startPauseTuesday: {
    type: String,
    required: false,
    trim: true,
  },
  endPauseTuesday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryOpenTuesday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryCloseTuesday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryStartPauseTuesday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryEndPauseTuesday: {
    type: String,
    required: false,
    trim: true,
  },
  isClosedWednesday: {
    type: Array,
    required: false,
    trim: true,
  },
  openWednesday: {
    type: String,
    required: false,
    trim: true,
  },
  closeWednesday: {
    type: String,
    required: false,
    trim: true,
  },
  startPauseWednesday: {
    type: String,
    required: false,
    trim: true,
  },
  endPauseWednesday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryOpenWednesday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryCloseWednesday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryStartPauseWednesday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryEndPauseWednesday: {
    type: String,
    required: false,
    trim: true,
  },
  isClosedThursday: {
    type: Array,
    required: false,
    trim: true,
  },
  openThursday: {
    type: String,
    required: false,
    trim: true,
  },
  closeThursday: {
    type: String,
    required: false,
    trim: true,
  },
  startPauseThursday: {
    type: String,
    required: false,
    trim: true,
  },
  endPauseThursday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryOpenThursday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryCloseThursday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryStartPauseThursday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryEndPauseThursday: {
    type: String,
    required: false,
    trim: true,
  },
  isClosedFriday: {
    type: Array,
    required: false,
    trim: true,
  },
  openFriday: {
    type: String,
    required: false,
    trim: true,
  },
  closeFriday: {
    type: String,
    required: false,
    trim: true,
  },
  startPauseFriday: {
    type: String,
    required: false,
    trim: true,
  },
  endPauseFriday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryOpenFriday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryCloseFriday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryStartPauseFriday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryEndPauseFriday: {
    type: String,
    required: false,
    trim: true,
  },
  isClosedSaturday: {
    type: Array,
    required: false,
    trim: true,
  },
  openSaturday: {
    type: String,
    required: false,
    trim: true,
  },
  closeSaturday: {
    type: String,
    required: false,
    trim: true,
  },
  startPauseSaturday: {
    type: String,
    required: false,
    trim: true,
  },
  endPauseSaturday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryOpenSaturday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryCloseSaturday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryStartPauseSaturday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryEndPauseSaturday: {
    type: String,
    required: false,
    trim: true,
  },
  isClosedSunday: {
    type: Array,
    required: false,
    trim: true,
  },
  openSunday: {
    type: String,
    required: false,
    trim: true,
  },
  closeSunday: {
    type: String,
    required: false,
    trim: true,
  },
  startPauseSunday: {
    type: String,
    required: false,
    trim: true,
  },
  endPauseSunday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryOpenSunday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryCloseSunday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryStartPauseSunday: {
    type: String,
    required: false,
    trim: true,
  },
  deliveryEndPauseSunday: {
    type: String,
    required: false,
    trim: true,
  },
  printerStatus: {
    type: Array,
    required: false,
    trim: true,
  },
  autoComplete: {
    type: Array,
    required: false,
    trim: true,
  },
  completeOrderTime: {
    type: Number,
    required: false,
    trim: true,
  },
});
module.exports = mongoose.model('settings', settingsSchema);
