require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
// const ipfilter = require('express-ipfilter').IpFilter;

// Calls the express function "express()" and puts new Express application inside the app variable.
// It's something like you are creating an object of a class
const app = express();
// The app object is instantiated on creation of the Express server.
// It has a middleware stack that can be customized in app.configure()
// To setup your middleware, you can invoke app.use(<specific_middleware_layer_here>)
// for every middleware layer that you want to add (it can be generic to all paths,
// or triggered only on specific path(s) your server handles), and it will add onto your Express middleware stack.
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//const ips = ['141.136.36.228'];
//app.use(ipfilter(ips));

//app.use('/public/images', express.static('../uploads'));
//app.use(express.static('uploads'));

//app.use('/uploads', express.static('public'));
app.use('/uploads', express.static('client/public'));

// Routes
app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/categoryRouter'));
app.use('/api', require('./routes/galeryRouter'));
app.use('/api', require('./routes/productRouter'));
app.use('/api', require('./routes/paymentRouter'));
app.use('/api', require('./routes/settingsRouter'));
app.use('/api', require('./routes/feeSettingsRouter'));
app.use('/api', require('./routes/subscriptionAmountRouter'));

// Connect to mongodb
// Return Value: This property returns an object containing the user environment.
// The process.env property is an inbuilt application programming interface of the process module which is used to get the user environment.

const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('Connected to mongodb');
  }
);

/* Ende: Vom Original wofür ist das? */
/* app.get('/', (req, res) => {
  res.json({ msg: 'Herzlich WIllkommen' });
}); */

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// Return Value: This property returns an object containing the user environment.
// The process.env property is an inbuilt application programming interface of the process module which is used to get the user environment.
const PORT = process.env.PORT || 5000;
// The app. listen() function is used to bind and listen the connections on the specified host and port.
// In order to actually serve requests, the listen method needs to be called on the server object.
// In most cases, all you'll need to pass to listen is the port number you want the server to listen on.
// There are some other options too, so consult the API reference.
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
