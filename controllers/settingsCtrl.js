const printerIPModel = require('../models/printerIPModel');
const Settings = require('../models/settingsModel');
const cloudinary = require('../utils/cloudinary');

const settingsCtrl = {
  getSettings: async (req, res) => {
    try {
      // Find settings
      const settings = await Settings.find();
      res.json(settings);
      //console.log(settings);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  patchDeliveryTimeSettings: async (req, res) => {
    try {
      const {
        minimalDeliveryTime,
        minimalCollectTime,
        notification,
        notificationMail,
      } = req.body;
      // Filter, update Options
      await Settings.findOneAndUpdate(
        { _id: req.body.id },
        {
          minimalDeliveryTime,
          minimalCollectTime,
          notification,
          notificationMail,
        }
      );
      // Success response
      res.json({ msg: 'Update Success!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  patchSettings: async (req, res) => {
    let brandCloudinary_id;
    let bgCloudinary_id;
    try {
      let brand = JSON.parse(req.body.brand || '{}');
      let brandImage =
        req.files?.brandImage && req.files?.brandImage[0].filename;

      let bgImage = req.files?.bgImage && req.files?.bgImage[0].filename;
      let color = JSON.parse(req.body.color ? req.body.color : '');
      let street = JSON.parse(req.body.street || '{}');
      let streetNumber = JSON.parse(req.body.streetNumber || '{}');
      let zipCode = JSON.parse(req.body.zipCode || '{}');
      let city = JSON.parse(req.body.city || '{}');
      let telefon = JSON.parse(req.body.telefon || '{}');
      let companyname = JSON.parse(req.body.companyname || '{}');
      let ceo = JSON.parse(req.body.ceo || '{}');
      let authority = JSON.parse(req.body.authority || '{}');
      let ustid = JSON.parse(req.body.ustid || '{}');
      let mapsLink = JSON.parse(req.body.mapsLink || '{}');
      let facebook = JSON.parse(req.body.facebook || '{}');
      let instagram = JSON.parse(req.body.instagram || '{}');
      let email = JSON.parse(req.body.email || '{}');
      let notification = JSON.parse(req.body.notification || '{}');
      let notificationMail = JSON.parse(req.body.notificationMail || '{}');
      let payments = JSON.parse(req.body.payments || '{}');
      let merchantID = JSON.parse(req.body.merchantID || '{}');
      let delivery = JSON.parse(req.body.delivery || '{}');
      let minDeliveryAmount = JSON.parse(req.body.minDeliveryAmount || '{}');
      let minPayPalAmount = JSON.parse(req.body.minPayPalAmount || '{}');
      let deliveryFirstDistance = JSON.parse(
        req.body.deliveryFirstDistance || '{}'
      );
      let deliveryFirstPrice = JSON.parse(req.body.deliveryFirstPrice || '{}');
      let deliverySecondDistance = JSON.parse(
        req.body.deliverySecondDistance || '{}'
      );
      let deliverySecondPrice = JSON.parse(
        req.body.deliverySecondPrice || '{}'
      );
      let deliveryThirdDistance = JSON.parse(
        req.body.deliveryThirdDistance || '{}'
      );
      let deliveryThirdPrice = JSON.parse(req.body.deliveryThirdPrice || '{}');
      let isClosed = JSON.parse(req.body.isClosed || '{}');
      let minBeforeClosing = JSON.parse(req.body.minBeforeClosing || '{}');
      let minimalDeliveryTime = JSON.parse(
        req.body?.minimalDeliveryTime || '{}'
      );
      let minimalCollectTime = JSON.parse(req.body.minimalCollectTime || '{}');
      /* Monday */
      let isClosedMonday = JSON.parse(req.body.isClosedMonday || '{}');
      let openMonday = JSON.parse(req.body.openMonday || '{}');
      let closeMonday = JSON.parse(req.body.closeMonday || '{}');
      let startPauseMonday = JSON.parse(req.body.startPauseMonday || '{}');
      let endPauseMonday = JSON.parse(req.body.endPauseMonday || '{}');
      let deliveryOpenMonday = JSON.parse(req.body.deliveryOpenMonday || '{}');
      let deliveryCloseMonday = JSON.parse(
        req.body.deliveryCloseMonday || '{}'
      );
      let deliveryStartPauseMonday = JSON.parse(
        req.body.deliveryStartPauseMonday || '{}'
      );
      let deliveryEndPauseMonday = JSON.parse(
        req.body.deliveryEndPauseMonday || '{}'
      );
      /* Tuesday */
      let isClosedTuesday = JSON.parse(req.body.isClosedTuesday || '{}');
      let openTuesday = JSON.parse(req.body.openTuesday || '{}');
      let closeTuesday = JSON.parse(req.body.closeTuesday || '{}');
      let startPauseTuesday = JSON.parse(req.body.startPauseTuesday || '{}');
      let endPauseTuesday = JSON.parse(req.body.endPauseTuesday || '{}');
      let deliveryOpenTuesday = JSON.parse(
        req.body.deliveryOpenTuesday || '{}'
      );
      let deliveryCloseTuesday = JSON.parse(
        req.body.deliveryCloseTuesday || '{}'
      );
      let deliveryStartPauseTuesday = JSON.parse(
        req.body.deliveryStartPauseTuesday || '{}'
      );
      let deliveryEndPauseTuesday = JSON.parse(
        req.body.deliveryEndPauseTuesday || '{}'
      );
      /* Wednesday */
      let isClosedWednesday = JSON.parse(req.body.isClosedWednesday || '{}');
      let openWednesday = JSON.parse(req.body.openWednesday || '{}');
      let closeWednesday = JSON.parse(req.body.closeWednesday || '{}');
      let startPauseWednesday = JSON.parse(
        req.body.startPauseWednesday || '{}'
      );
      let endPauseWednesday = JSON.parse(req.body.endPauseWednesday || '{}');
      let deliveryOpenWednesday = JSON.parse(
        req.body.deliveryOpenWednesday || '{}'
      );
      let deliveryCloseWednesday = JSON.parse(
        req.body.deliveryCloseWednesday || '{}'
      );
      let deliveryStartPauseWednesday = JSON.parse(
        req.body.deliveryStartPauseWednesday || '{}'
      );
      let deliveryEndPauseWednesday = JSON.parse(
        req.body.deliveryEndPauseWednesday || '{}'
      );
      /* Thursday */
      let isClosedThursday = JSON.parse(req.body.isClosedThursday || '{}');
      let openThursday = JSON.parse(req.body.openThursday || '{}');
      let closeThursday = JSON.parse(req.body.closeThursday || '{}');
      let startPauseThursday = JSON.parse(req.body.startPauseThursday || '{}');
      let endPauseThursday = JSON.parse(req.body.endPauseThursday || '{}');
      let deliveryOpenThursday = JSON.parse(
        req.body.deliveryOpenThursday || '{}'
      );
      let deliveryCloseThursday = JSON.parse(
        req.body.deliveryCloseThursday || '{}'
      );
      let deliveryStartPauseThursday = JSON.parse(
        req.body.deliveryStartPauseThursday || '{}'
      );
      let deliveryEndPauseThursday = JSON.parse(
        req.body.deliveryEndPauseThursday || '{}'
      );
      /* Friday  */
      let isClosedFriday = JSON.parse(req.body.isClosedFriday || '{}');
      let openFriday = JSON.parse(req.body.openFriday || '{}');
      let closeFriday = JSON.parse(req.body.closeFriday || '{}');
      let startPauseFriday = JSON.parse(req.body.startPauseFriday || '{}');
      let endPauseFriday = JSON.parse(req.body.endPauseFriday || '{}');
      let deliveryOpenFriday = JSON.parse(req.body.deliveryOpenFriday || '{}');
      let deliveryCloseFriday = JSON.parse(
        req.body.deliveryCloseFriday || '{}'
      );
      let deliveryStartPauseFriday = JSON.parse(
        req.body.deliveryStartPauseFriday || '{}'
      );
      let deliveryEndPauseFriday = JSON.parse(
        req.body.deliveryEndPauseFriday || '{}'
      );
      /* Saturday */
      let isClosedSaturday = JSON.parse(req.body.isClosedSaturday || '{}');
      let openSaturday = JSON.parse(req.body.openSaturday || '{}');
      let closeSaturday = JSON.parse(req.body.closeSaturday || '{}');
      let startPauseSaturday = JSON.parse(req.body.startPauseSaturday || '{}');
      let endPauseSaturday = JSON.parse(req.body.endPauseSaturday || '{}');
      let deliveryOpenSaturday = JSON.parse(
        req.body.deliveryOpenSaturday || '{}'
      );
      let deliveryCloseSaturday = JSON.parse(
        req.body.deliveryCloseSaturday || '{}'
      );
      let deliveryStartPauseSaturday = JSON.parse(
        req.body.deliveryStartPauseSaturday || '{}'
      );
      let deliveryEndPauseSaturday = JSON.parse(
        req.body.deliveryEndPauseSaturday || '{}'
      );
      /* Sunday */
      let isClosedSunday = JSON.parse(req.body.isClosedSunday || '{}');
      let openSunday = JSON.parse(req.body.openSunday || '{}');
      let closeSunday = JSON.parse(req.body.closeSunday || '{}');
      let startPauseSunday = JSON.parse(req.body.startPauseSunday || '{}');
      let endPauseSunday = JSON.parse(req.body.endPauseSunday || '{}');
      let deliveryOpenSunday = JSON.parse(req.body.deliveryOpenSunday || '{}');
      let deliveryCloseSunday = JSON.parse(
        req.body.deliveryCloseSunday || '{}'
      );
      let deliveryStartPauseSunday = JSON.parse(
        req.body.deliveryStartPauseSunday || '{}'
      );
      let deliveryEndPauseSunday = JSON.parse(
        req.body.deliveryEndPauseSunday || '{}'
      );
      let printerStatus = JSON.parse(req.body.printerStatus || '{}');
      let autoComplete = JSON.parse(req.body.autoComplete || '{}');
      let completeOrderTime = JSON.parse(req.body.completeOrderTime || '{}');

      let settings = await Settings.findOne({
        _id: JSON.parse(req.body._id),
      });
      settings.brand = brand;
      if (brandImage) {
        if (settings.brandImage) {
          try {
            await cloudinary.uploader.destroy(settings.brandCloudinary_id);
          } catch (err) {
            console.log(err);
            res.status(500).json({ msg: err.message });
          }
        }
        try {
          const result = await cloudinary.uploader.upload(
            req.files.brandImage[0].path,
            {
              folder: `${process.env.CLIENT_URL}/settings`,
              width: 1920,
              height: 1080,
            }
          );
          settings.brandImage = result.secure_url;
          brandCloudinary_id = result.public_id;
          settings.brandCloudinary_id = brandCloudinary_id;
          console.log('brand_id', brandCloudinary_id);
        } catch (err) {
          console.log(err);
          return res.status(500).json({ msg: err.message });
        }
      }
      if (bgImage) {
        if (settings.bgImage) {
          try {
            await cloudinary.uploader.destroy(settings.bgCloudinary_id);
          } catch (err) {
            res.status(500).json({ msg: err.message });
          }
        }
        try {
          const result = await cloudinary.uploader.upload(
            req.files.bgImage[0].path,
            {
              folder: `${process.env.CLIENT_URL}/settings`,
              width: 1920,
              height: 1080,
            }
          );
          settings.bgImage = result.secure_url;
          bgCloudinary_id = result.public_id;
          settings.bgCloudinary_id = bgCloudinary_id;
          console.log('bg_id', bgCloudinary_id);
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      }

      settings.color = color;
      settings.street = street;
      settings.streetNumber = streetNumber;
      settings.zipCode = zipCode;
      settings.city = city;
      settings.telefon = telefon;
      settings.companyname = companyname;
      settings.ceo = ceo;
      settings.authority = authority;
      settings.ustid = ustid;
      settings.mapsLink = mapsLink;
      settings.facebook = facebook;
      settings.instagram = instagram;
      settings.email = email;
      settings.payments = payments;
      settings.merchantID = merchantID;
      settings.notification = notification;
      settings.notificationMail = notificationMail;
      settings.delivery = delivery;
      settings.minDeliveryAmount = minDeliveryAmount;
      settings.minPayPalAmount = minPayPalAmount;
      settings.deliveryFirstDistance = deliveryFirstDistance;
      settings.deliveryFirstPrice = deliveryFirstPrice;
      settings.deliverySecondDistance = deliverySecondDistance;
      settings.deliverySecondPrice = deliverySecondPrice;
      settings.deliveryThirdDistance = deliveryThirdDistance;
      settings.deliveryThirdPrice = deliveryThirdPrice;
      settings.isClosed = isClosed;
      settings.minBeforeClosing = minBeforeClosing;
      settings.minimalDeliveryTime = minimalDeliveryTime;
      settings.minimalCollectTime = minimalCollectTime;
      /* Monday */
      settings.isClosedMonday = isClosedMonday;
      settings.openMonday = openMonday;
      settings.closeMonday = closeMonday;
      settings.startPauseMonday = startPauseMonday;
      settings.endPauseMonday = endPauseMonday;
      settings.deliveryOpenMonday = deliveryOpenMonday;
      settings.deliveryCloseMonday = deliveryCloseMonday;
      settings.deliveryStartPauseMonday = deliveryStartPauseMonday;
      settings.deliveryEndPauseMonday = deliveryEndPauseMonday;
      /* Tuesday */
      settings.isClosedTuesday = isClosedTuesday;
      settings.openTuesday = openTuesday;
      settings.closeTuesday = closeTuesday;
      settings.startPauseTuesday = startPauseTuesday;
      settings.endPauseTuesday = endPauseTuesday;
      settings.deliveryOpenTuesday = deliveryOpenTuesday;
      settings.deliveryCloseTuesday = deliveryCloseTuesday;
      settings.deliveryStartPauseTuesday = deliveryStartPauseTuesday;
      settings.deliveryEndPauseTuesday = deliveryEndPauseTuesday;
      /* Wednesday */
      settings.isClosedWednesday = isClosedWednesday;
      settings.openWednesday = openWednesday;
      settings.closeWednesday = closeWednesday;
      settings.startPauseWednesday = startPauseWednesday;
      settings.endPauseWednesday = endPauseWednesday;
      settings.deliveryOpenWednesday = deliveryOpenWednesday;
      settings.deliveryCloseWednesday = deliveryCloseWednesday;
      settings.deliveryStartPauseWednesday = deliveryStartPauseWednesday;
      settings.deliveryEndPauseWednesday = deliveryEndPauseWednesday;
      /* Thursday */
      settings.isClosedThursday = isClosedThursday;
      settings.openThursday = openThursday;
      settings.closeThursday = closeThursday;
      settings.startPauseThursday = startPauseThursday;
      settings.endPauseThursday = endPauseThursday;
      settings.deliveryOpenThursday = deliveryOpenThursday;
      settings.deliveryCloseThursday = deliveryCloseThursday;
      settings.deliveryStartPauseThursday = deliveryStartPauseThursday;
      settings.deliveryEndPauseThursday = deliveryEndPauseThursday;
      /* Friday  */
      settings.isClosedFriday = isClosedFriday;
      settings.openFriday = openFriday;
      settings.closeFriday = closeFriday;
      settings.startPauseFriday = startPauseFriday;
      settings.endPauseFriday = endPauseFriday;
      settings.deliveryOpenFriday = deliveryOpenFriday;
      settings.deliveryCloseFriday = deliveryCloseFriday;
      settings.deliveryStartPauseFriday = deliveryStartPauseFriday;
      settings.deliveryEndPauseFriday = deliveryEndPauseFriday;
      /* Saturday */
      settings.isClosedSaturday = isClosedSaturday;
      settings.openSaturday = openSaturday;
      settings.closeSaturday = closeSaturday;
      settings.startPauseSaturday = startPauseSaturday;
      settings.endPauseSaturday = endPauseSaturday;
      settings.deliveryOpenSaturday = deliveryOpenSaturday;
      settings.deliveryCloseSaturday = deliveryCloseSaturday;
      settings.deliveryStartPauseSaturday = deliveryStartPauseSaturday;
      settings.deliveryEndPauseSaturday = deliveryEndPauseSaturday;
      /* Sunday */
      settings.isClosedSunday = isClosedSunday;
      settings.openSunday = openSunday;
      settings.closeSunday = closeSunday;
      settings.startPauseSunday = startPauseSunday;
      settings.endPauseSunday = endPauseSunday;
      settings.deliveryOpenSunday = deliveryOpenSunday;
      settings.deliveryCloseSunday = deliveryCloseSunday;
      settings.deliveryStartPauseSunday = deliveryStartPauseSunday;
      settings.deliveryEndPauseSunday = deliveryEndPauseSunday;
      settings.companyname = companyname;
      /* Printer */
      settings.printerStatus = printerStatus;
      settings.autoComplete = autoComplete;
      settings.completeOrderTime = completeOrderTime;

      settings.save();

      res.json({ msg: 'Erfolgreich aktualisiert' });
    } catch (err) {
      console.log('error', err);
      return res.status(500).json({ msg: err.message });
    }
  },
  getPrinterIP: async (req, res) => {
    try {
      const printerip = await printerIPModel.find();
      res.json(printerip);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  patchPrinterIP: async (req, res) => {
    try {
      const { ip } = req.body;
      // Filter, update Options

      let obj = await printerIPModel.findOne({ _id: req.body.id });

      if (obj) {
        await printerIPModel.findOneAndUpdate(
          { _id: req.body.id },
          {
            ip,
          }
        );
      } else {
        let newObj = new printerIPModel({
          ip,
        });
        await newObj.save();
      }

      // Success response
      res.json({ msg: 'Update Success!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = settingsCtrl;
