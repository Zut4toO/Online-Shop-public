// Step 1: create Model Schema
// ---> Step 2: create Controller - read/write data through a Model to the DB. basics: (try{res.json({msg:"Test"})} catch(err){return res.status(500).json({msg: err.message})}) <---
// Step 3: create Router

// Before we define our routes, we'll first create all the dummy/skeleton callback functions that they will invoke. The callbacks will be stored in separate "controller"

const Users = require('../models/userModel');

const Payments = require('../models/paymentModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('./sendMail');

// Controllers:
// Status 200: Alles gut
// Status 400: Client Error
// Status 500: Server Error

const { CLIENT_URL } = process.env;

const userCtrl = {
  register: async (req, res) => {
    try {
      //The req.body object allows you to access data in a string or JSON object from the client side.
      //You generally use the req.body object to receive data through POST and PUT requests in the Express server.

      // ES6: Arrays: const a = items[0]; const b = items[1]; Can be written as: const [a, b] = items;
      // ES6: Objects: const name = app.name; const version = app.version; Can be written as: const { name, version } = app;
      const {
        firstName,
        lastName,
        companyName,
        street,
        streetNumber,
        zipCode,
        city,
        email,
        telefon,
        password,
      } = req.body;
      // console.log(firstName, email, password); to check if mongodb connection works

      /* Enter Data to every field */
      if (
        !firstName ||
        !lastName ||
        !street ||
        !streetNumber ||
        !zipCode ||
        !city ||
        !email ||
        !telefon ||
        !password
      )
        return res.status(400).json({
          msg: 'Bitte fülle alle mit einem * makierten Felder aus',
        });

      /* Validate Email */
      if (!validateEmail(email))
        return res
          .status(400)
          .json({ msg: 'Diese Email scheint ungültig zu sein' });

      /* Check if mail is already registered */
      const user = await Users.findOne({ email });
      if (user)
        return res
          .status(400)
          .json({ msg: 'Diese Email wird bereits verwendet' });

      /* Check if password fits requirements */
      if (password.length < 6)
        return res.status(400).json({
          msg: 'Dein Passwort muss aus mindestens 6 Zeichen bestehen',
        });

      /* Hash the password with bcrypt */
      const passwordHash = await bcrypt.hash(password, 12);
      // console.log({ password, passwordHash });

      /* Save given input to one object */
      const newUser = {
        firstName,
        lastName,
        companyName,
        street,
        streetNumber,
        zipCode,
        city,
        email,
        telefon,
        userID: '#' + Math.floor(100000000 + Math.random() * 100000000),
        password: passwordHash,
      };
      // console.log(newUser);

      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/user/activate/${activation_token}`;

      sendMail.sendMailRegister(email, url, 'Verifiziere Deine Email');
      // console.log({ activation_token });

      res.json({
        msg: 'Registrierung erfolgreich. Bitte bestätige deine Email',
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      // ES6: Objects: const activation_token = req.body.activation_token; const { activation_token } = req.body;
      const { activation_token } = req.body;
      // Verify with activation token and activation secret
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      // User object
      // ES6: const a = items[0]; const b = items[1]; Can be written as: const [a, b] = items;
      const {
        firstName,
        lastName,
        companyName,
        street,
        streetNumber,
        zipCode,
        city,
        email,
        telefon,
        password,
      } = user;

      // Check if users email already exist
      const check = await Users.findOne({ email });
      if (check)
        return res
          .status(400)
          .json({ msg: 'Diese Email wird bereits verwendet' });

      // Create newUser object and save it to mongodb
      const newUser = new Users({
        firstName,
        lastName,
        companyName,
        street,
        streetNumber,
        zipCode,
        city,
        email,
        telefon,
        password,
      });

      await newUser.save();

      res.json({ msg: 'Dein Konto wurde erfolgreich freigeschaltet' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    // async: await Users.findOne it will wait until Users.findOne is done and then it checks if(!user)
    try {
      // ES6: Objects: const email = req.body.email; const password = req.body.password; Can be written as: const { email } = req.body;
      const { email, password } = req.body;
      // Check if email is in DB
      const user = await Users.findOne({ email });
      // If not:
      if (!user)
        return res.status(400).json({ msg: 'This email does not exist.' });
      // If yes check pw:
      const isMatch = await bcrypt.compare(password, user.password);
      // Does pw match?
      if (!isMatch) return res.status(400).json({ msg: 'Passwort ist falsch' });
      // Create refresh token thats least 7 days and create cookie
      const refresh_token = createRefreshToken({ id: user._id });

      //res.cookie(name, value [, options])
      //The res.cookie() function is used to set the cookie name to value. The value parameter may be a string or object converted to JSON.
      //The options parameter contains various properties like encode, expires, domain, etc.
      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // console.log(user);
      res.json({ msg: 'Login success!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAccessToken: (req, res) => {
    try {
      // req the tokien from cookies and check if available
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: 'Bitte anmelden' });

      //JWT verify method is used for verify the token the take two arguments
      // one is token string value, and second one is secret key for matching the token is valid or not.
      //The validation method returns a decode object that stored the token in.
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: 'Bitte anmelden' });

        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      // ES6: Objects: const email = req.body.email; const { email } = req.body;
      const { email } = req.body;
      // Check if Email is in system
      const user = await Users.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ msg: 'Diese E-Mail ist nicht im System vorhanden' });
      // Create access Token
      const access_token = createAccessToken({ id: user._id });
      // Create reset Link
      const url = `${CLIENT_URL}/user/reset/${access_token}`;

      // Send Email with reset Link
      sendMail.sendMailForgotPassword(email, url, 'Setze dein Passwort zurück');
      // Response for forgot PW Success
      res.json({
        msg: 'Überprüfe dein E-Mail Postfach um dein Passwort zurück zusetzen',
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      // ES6: Objects: const password = req.body.password; const { password } = req.body;
      const { password } = req.body;
      // console.log(password);

      // Hash the PW
      const passwordHash = await bcrypt.hash(password, 12);

      // Filter and say what to update
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );
      // Successfully change response
      res.json({ msg: 'Passwort wurde geändert' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserInfor: async (req, res) => {
    try {
      // Find certain User with all data without password, requires user access
      const user = await Users.findById(req.user.id).select('-password');
      // Response User data w/o pw
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUsersAllInfor: async (req, res) => {
    try {
      // console.log(req.user);
      // Find User with all data without password, requires admin access
      const user = await Users.find().select('-password');
      // Response User data w/o pw
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllUsersPage: async (req, res) => {
    try {
      // console.log(req.user);
      // Find all Users with all data without password, requires admin access
      const keyword = req.query.keyword
        ? {
            $or: [
              {
                lastName: {
                  $regex: req.query.keyword,
                  $options: 'i',
                },
              },
              {
                email: {
                  $regex: req.query.keyword,
                  $options: 'i',
                },
              },
            ],
          }
        : {};

      const pageSize = 10;
      const page = Number(req.query.pageNumber) || 1;
      const count = await Users.countDocuments({ ...keyword });

      const user = await Users.find({ ...keyword })
        .select('-password')
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ role: -1 });
      // Response User data w/o pw
      res.json({ user, page, pages: Math.ceil(count / pageSize) });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      // Clear Cookie, name of Cookie, path?
      res.clearCookie('refreshtoken', { path: '/user/refresh_token' });
      // Res success
      return res.json({ msg: 'Logged out.' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      // Need user access
      // ES6: Objects: const name = app.name; const version = app.version; Can be written as: const { name, version } = app;
      const {
        firstName,
        lastName,
        companyName,
        street,
        streetNumber,
        zipCode,
        city,
        telefon,
      } = req.body;
      // Filter, update Options
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          firstName,
          lastName,
          companyName,
          street,
          streetNumber,
          zipCode,
          city,
          telefon,
        }
      );
      // Success response
      res.json({ msg: 'Nutzer aktualisiert' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUsersRole: async (req, res) => {
    try {
      // Need admin access
      // ES6: Objects: const role = req.body.role; Can be written as: const { role } = req.body;
      const { role } = req.body;
      // Find user with ID and update
      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          role,
        }
      );
      // Response success
      res.json({ msg: 'Update Success!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      // Find user by ID and delete
      await Users.findByIdAndDelete(req.params.id);
      // Response success
      res.json({ msg: 'Deleted Success!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteYourSelf: async (req, res) => {
    try {
      // Find user by ID and delete
      console.log(req.user.id);
      await Users.findByIdAndDelete(req.user.id);
      // Response success
      res.json({ msg: 'Deleted Success!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addCart: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: 'User does not exist.' });

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );

      return res.json({ msg: 'Added to cart' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  history: async (req, res) => {
    try {
      const pageSize = 5;
      const page = Number(req.query.pageNumber) || 1;
      const count = await Payments.countDocuments({ user_id: req.user.id });
      const history = await Payments.find({ user_id: req.user.id })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ _id: -1 });
      res.json({ history, page, pages: Math.ceil(count / pageSize) });
    } catch (err) {
      return res.status(500).json({ msg: 'err.message' });
    }
  },
};

/* Regex for email validation */
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// The payload is the body of your post request.
// Als Nutzdaten (Englisch payload) bezeichnet man in der Kommunikationstechnik diejenigen während einer Kommunikation zwischen zwei Partnern transportierten Daten eines
// Datenpakets, die keine Steuer- oder Protokollinformationen enthalten. Nutzdaten sind u. a. Sprache, Text, Zeichen, Bilder und Töne.

// Create email activation token that leasts 5 minutes
// JWT sign method is used to creating a token the take are three arguments one is a response object,
// and the second one is a secret key and the last one is an options object for better use of the token.
const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

// Temporary Access Token for forgot PW and
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

// Create refresh token thats leasts 7 days
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = userCtrl;
