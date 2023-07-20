const Payments = require('../models/paymentModel');
const Users = require('../models/userModel');
const CalculatedFees = require('../models/calculateFeesModel');
const Settings = require('../models/settingsModel');
const sendMail = require('./sendMail');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
dayjs.locale('de');

const paymentCtrl = {
  getPayments: async (req, res) => {
    try {
      const payments = await Payments.find({ status: true });
      res.json(payments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getMonthlyPayments: async (req, res) => {
    const { monthYearStart, monthYearEnd } = req.query;
    try {
      const payments = await Payments.find({
        status: true,
        createdAt: {
          $gte: new Date(monthYearStart),
          $lt: new Date(monthYearEnd),
        },
      });
      res.json(payments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getOpenOrders: async (req, res) => {
    try {
      const payments = await Payments.find({ status: false }).sort({
        createdAt: 1,
      });
      res.json(payments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getCompletedOrders: async (req, res) => {
    try {
      const keyword = req.query.keyword
        ? {
            $or: [
              {
                paymentID: {
                  $regex: req.query.keyword,
                  $options: 'i',
                },
              },
              {
                city: {
                  $regex: req.query.keyword,
                  $options: 'i',
                },
              },
              {
                lastName: {
                  $regex: req.query.keyword,
                  $options: 'i',
                },
              },
            ],
          }
        : {};

      //console.log({ ...keyword });
      //console.log(await Payments.countDocuments({ ...keyword }));

      const pageSize = 5;
      const page = Number(req.query.pageNumber) || 1;
      const count = await Payments.countDocuments({ ...keyword, status: true });

      const delivered = await Payments.find({ ...keyword, status: true })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ updatedAt: -1 });
      res.json({ delivered, page, pages: Math.ceil(count / pageSize) });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createPayPalPayment: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select(
        'firstName lastName email street streetNumber zipCode city telefon'
      );
      if (!user)
        return res.status(400).json({ msg: 'Benutzer nicht im System' });

      const {
        cartItems,
        paymentID,
        time,
        sliderDeliveryValue,
        carttotal,
        message,
        notificiation,
        notificiationMail,
      } = req.body;

      const {
        _id,
        firstName,
        lastName,
        companyName,
        street,
        streetNumber,
        zipCode,
        city,
        telefon,
        email,
      } = user;
      try {
        const newPayment = new Payments({
          user_id: _id,
          firstName,
          lastName,
          companyName,
          street,
          streetNumber,
          zipCode,
          city,
          telefon,
          email,
          cartItems,
          time: time,
          delivery: sliderDeliveryValue,
          paymentID,
          payment: 'Online',
          carttotal: carttotal,
          message: message,
        });
        await newPayment.save();
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
      try {
        sendMail.sendMailOrder(
          email,
          firstName,
          lastName,
          street,
          streetNumber,
          zipCode,
          city,
          cartItems,
          time,
          sliderDeliveryValue,
          paymentID,
          'Online',
          carttotal,
          message
        );
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
      try {
        if (notificiation) {
          sendMail.sendNotification(
            notificiationMail,
            firstName,
            lastName,
            street,
            streetNumber,
            zipCode,
            city,
            telefon,
            cartItems,
            time,
            sliderDeliveryValue,
            paymentID,
            'Online',
            carttotal,
            message
          );
        }
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }

      res.json({ msg: 'Zahlung erfolgreich' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  guestCreatePayPalPayment: async (req, res) => {
    try {
      const {
        cartItems,
        paymentID,
        time,
        sliderDeliveryValue,
        carttotal,
        message,
        guestData,
        notificiation,
        notificiationMail,
      } = req.body;
      try {
        const newPayment = new Payments({
          user_id: 'Guest',
          firstName: guestData.firstName,
          lastName: guestData.lastName,
          street: guestData.street,
          streetNumber: guestData.streetNumber,
          zipCode: guestData.zipCode,
          city: guestData.city,
          telefon: guestData.telefon,
          email: guestData.email,
          cartItems,
          time: time,
          delivery: sliderDeliveryValue,
          paymentID,
          payment: 'Online',
          carttotal: carttotal,
          message: message,
        });

        await newPayment.save();
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
      try {
        sendMail.sendMailOrder(
          guestData.email,
          guestData.firstName,
          guestData.lastName,
          guestData.street,
          guestData.streetNumber,
          guestData.zipCode,
          guestData.city,
          cartItems,
          time,
          sliderDeliveryValue,
          paymentID,
          'Online',
          carttotal,
          message
        );
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
      try {
        if (notificiation) {
          sendMail.sendNotification(
            notificiationMail,
            guestData.firstName,
            guestData.lastName,
            guestData.street,
            guestData.streetNumber,
            guestData.zipCode,
            guestData.city,
            guestData.telefon,
            cartItems,
            time,
            sliderDeliveryValue,
            paymentID,
            'Online',
            carttotal,
            message
          );
        }
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }

      res.json({ msg: 'Zahlung erfolgreich' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  orderStatus: async (req, res) => {
    const id = req.body.id;
    try {
      const order = await Payments.findOne({ _id: id });
      try {
        order.status = true;
        await order.save();
      } catch (error) {
        return res.status(500).json({ message: error });
      }
      try {
        const date = dayjs(order.createdAt).format('MM/YYYY');
        const dateExist = await CalculatedFees.find({ monthYear: date });

        if (dateExist.length > 0) {
          await CalculatedFees.findOneAndUpdate(
            { monthYear: date },
            {
              $inc: {
                total: order.carttotal,
              },
            }
          );
        } else {
          const newMonthYear = new CalculatedFees({
            monthYear: date,
            total: order.carttotal,
          });
          await newMonthYear.save();
        }
      } catch (error) {
        return res.status(500).json({ message: error });
      }
      res.send('Bestellung erfolgreich übergeben');
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
  cancelOrder: async (req, res) => {
    try {
      const id = req.body.deleteId;
      const decRevenue = await Payments.findById(id);
      const date = dayjs(decRevenue.createdAt).format('MM/YYYY');

      await Payments.findOneAndUpdate(
        { _id: id },
        {
          cancelation: true,
        }
      );
      await CalculatedFees.findOneAndUpdate(
        { monthYear: date },
        {
          $inc: {
            total: -decRevenue.carttotal,
          },
        }
      );
    } catch (error) {
      return res.status(500).json({ message: error });
    }

    res.send('Bestellung wurde storniert');
  },

  createCashPayment: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select(
        'firstName lastName email street streetNumber zipCode city telefon'
      );
      if (!user)
        return res.status(400).json({ msg: 'Benutzer nicht im System' });

      const {
        cartItems,
        paymentID,
        time,
        sliderDeliveryValue,
        carttotal,
        message,
        notificiation,
        notificiationMail,
      } = req.body;
      const {
        _id,
        firstName,
        lastName,
        companyName,
        street,
        streetNumber,
        zipCode,
        city,
        telefon,
        email,
      } = user;
      try {
        const newPayment = new Payments({
          user_id: _id,
          firstName,
          lastName,
          companyName,
          street,
          streetNumber,
          zipCode,
          city,
          telefon,
          email,
          cartItems,
          time: time,
          delivery: sliderDeliveryValue,
          paymentID,
          payment: 'Bar',
          carttotal: carttotal,
          message: message,
        });

        await newPayment.save();
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }

      // Hier SendMailOrder
      try {
        sendMail.sendMailOrder(
          email,
          firstName,
          lastName,
          street,
          streetNumber,
          zipCode,
          city,
          cartItems,
          time,
          sliderDeliveryValue,
          paymentID,
          'Bar',
          carttotal,
          message
        );
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
      try {
        if (notificiation) {
          sendMail.sendNotification(
            notificiationMail,
            firstName,
            lastName,
            street,
            streetNumber,
            zipCode,
            city,
            telefon,
            cartItems,
            time,
            sliderDeliveryValue,
            paymentID,
            'Bar',
            carttotal,
            message
          );
        }
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }

      res.json({ msg: 'Zahlung erfolgreich' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  /* Guest Cash Payment */
  guestCreateCashPayment: async (req, res) => {
    try {
      const {
        cartItems,
        paymentID,
        time,
        sliderDeliveryValue,
        carttotal,
        message,
        guestData,
        notificiation,
        notificiationMail,
      } = req.body;
      try {
        const newPayment = new Payments({
          user_id: 'Guest',
          firstName: guestData.firstName,
          lastName: guestData.lastName,
          street: guestData.street,
          streetNumber: guestData.streetNumber,
          zipCode: guestData.zipCode,
          city: guestData.city,
          telefon: guestData.telefon,
          email: guestData.email,
          cartItems,
          time: time,
          delivery: sliderDeliveryValue,
          paymentID,
          payment: 'Bar',
          carttotal: carttotal,
          message: message,
        });

        await newPayment.save();
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }

      try {
        sendMail.sendMailOrder(
          guestData.email,
          guestData.firstName,
          guestData.lastName,
          guestData.street,
          guestData.streetNumber,
          guestData.zipCode,
          guestData.city,
          cartItems,
          time,
          sliderDeliveryValue,
          paymentID,
          'Bar',
          carttotal,
          message
        );
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
      try {
        if (notificiation) {
          sendMail.sendNotification(
            notificiationMail,
            guestData.firstName,
            guestData.lastName,
            guestData.street,
            guestData.streetNumber,
            guestData.zipCode,
            guestData.city,
            guestData.telefon,
            cartItems,
            time,
            sliderDeliveryValue,
            paymentID,
            'Bar',
            carttotal,
            message
          );
        }
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }

      res.json({ msg: 'Zahlung erfolgreich' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  /* Pay Fees */

  getCalculatedPayFees: async (req, res) => {
    try {
      const calculatedFees = await CalculatedFees.find();
      res.json(calculatedFees);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = paymentCtrl;
