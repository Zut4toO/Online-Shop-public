const Users = require('../models/userModel');

const authMasterAdmin = async (req, res, next) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });

    if (user.role !== 3)
      return res
        .status(500)
        .json({ msg: 'MasterAdmin resources access denied.' });

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authMasterAdmin;

//The next() is useful when writing custom middleware functions in Express js and allows us to pass control from one middleware function to another.
