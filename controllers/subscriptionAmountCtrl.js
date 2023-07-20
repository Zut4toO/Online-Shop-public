const SubscriptionAmount = require('../models/subscriptionAmountModel');
const ActiveSubModel = require('../models/subscriptionStatusModel');
const HistorySubModel = require('../models/subscriptionAmountModel');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
dayjs.locale('de');

const feeSettingsCtrl = {
  getSubAmount: async (req, res) => {
    try {
      const subAmount = await SubscriptionAmount.find();
      res.json(subAmount);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateSubAmount: async (req, res) => {
    try {
      // ES6: const name = req.body.name; Can be written as: const {name} = req.body
      const { subscriptionAmount } = req.body;
      // Find category by Id and update with new name
      let obj = await SubscriptionAmount.findOne({ _id: req.body.id });

      if (obj) {
        await SubscriptionAmount.findOneAndUpdate(
          { _id: req.body.id },
          {
            subscriptionAmount,
          }
        );
        res.json({ msg: 'Gebühren erfolgreich aktualisiert' });
      } else {
        let newObj = new SubscriptionAmount({
          subscriptionAmount,
        });
        await newObj.save();
        res.json({ msg: 'Gebühren erfolgreich aktualisiert' });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getActiveSub: async (req, res) => {
    try {
      const subStatus = await ActiveSubModel.find();
      res.json(subStatus);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateActiveSub: async (req, res) => {
    try {
      // ES6: const name = req.body.name; Can be written as: const {name} = req.body

      const activesub = await ActiveSubModel.find();
      const oldId = activesub[0]?.subscriptionID;
      const oldIdStartDate = activesub[0]?.createdAt;
      const oldIdEndDate = activesub[0]?.updatedAt;
      if (activesub.length >= 1) {
        const newHistorySub = new HistorySubModel({
          subscriptionID: oldId,
          oldIdStartDate,
          oldIdEndDate,
        });
        await newHistorySub.save();
      }

      const { subscriptionID } = req.body;
      // Find category by Id and update with new name
      console.log('body', req.body);
      await ActiveSubModel.findOneAndUpdate(
        { _id: req.body.id },
        {
          subscriptionID,
          subscriptionStatus: 'active',
        }
      );
      res.json({ msg: 'Gebühren erfolgreich aktualisiert' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = feeSettingsCtrl;
