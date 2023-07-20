const FeeSettings = require('../models/feeSettingsModel');

const feeSettingsCtrl = {
  getFeeSettings: async (req, res) => {
    try {
      const feesettings = await FeeSettings.find();
      res.json(feesettings);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateFeeSettings: async (req, res) => {
    try {
      // ES6: const name = req.body.name; Can be written as: const {name} = req.body
      const {
        fixpreisStatus,
        fixpreisAmount,
        serviceFeeUntil,
        serviceAmount,
        firstLevelAmount,
        firstLevelProvision,
        secondLevelAmount,
        secondLevelProvision,
        thirdLevelAmount,
        thirdLevelProvision,
        fourthLevelAmount,
        fourthLevelProvision,
        fifthLevelAmount,
        fifthLevelProvision,
        sixthLevelAmount,
        sixthLevelProvision,
        seventhLevelAmount,
        seventhLevelProvision,
      } = req.body;
      console.log(req.body);
      console.log(req.params);
      // Find category by Id and update with new name
      await FeeSettings.findOneAndUpdate(
        { _id: req.body.id },
        {
          fixpreisStatus,
          fixpreisAmount,
          serviceFeeUntil,
          serviceAmount,
          firstLevelAmount,
          firstLevelProvision,
          secondLevelAmount,
          secondLevelProvision,
          thirdLevelAmount,
          thirdLevelProvision,
          fourthLevelAmount,
          fourthLevelProvision,
          fifthLevelAmount,
          fifthLevelProvision,
          sixthLevelAmount,
          sixthLevelProvision,
          seventhLevelAmount,
          seventhLevelProvision,
        }
      );
      console.log('test');
      console.log(req.params.id);
      console.log(firstLevelAmount);
      res.json({ msg: 'Gebühren erfolgreich aktualisiert' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = feeSettingsCtrl;
