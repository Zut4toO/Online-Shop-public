const router = require('express').Router();
const paymentCtrl = require('../controllers/paymentCtrl');
const paypal = require('../controllers/paypalCtrl');
const paypalFee = require('../controllers/paypalFeeCtrl');
const distanceCtrl = require('../controllers/distanceCrtl');
const Products = require('../models/productModel');
const SubscriptionAmount = require('../models/subscriptionAmountModel');
const auth = require('../middleware/auth');
const authMinSupport = require('../middleware/authMinSupport');
const authMinAdmin = require('../middleware/authMinAdmin');
const printerCtrl = require('../controllers/printerCtrl');

router.route('/payment').get(auth, authMinAdmin, paymentCtrl.getPayments);

router
  .route('/monthlypayment')
  .get(auth, authMinAdmin, paymentCtrl.getMonthlyPayments);

router
  .route('/openorders')
  .get(auth, authMinSupport, paymentCtrl.getOpenOrders);

router
  .route('/completedorders')
  .get(auth, authMinSupport, paymentCtrl.getCompletedOrders);

router
  .route('/deliverorder')
  .post(auth, authMinSupport, paymentCtrl.orderStatus);

router
  .route('/cancelorder')
  .post(auth, authMinSupport, paymentCtrl.cancelOrder);

router.route('/subscription').post(auth, authMinAdmin, async (req, res) => {
  const searchPlan = await SubscriptionAmount.find();
  const subscription = await paypalFee.createSubscription(
    searchPlan[0]?.subscriptionAmount
  );
  res.json(subscription);
});

//let webhook_data = [];
router.post('/webhook/subscription', async (req, res) => {
  //webhook_data.push(req.body);

  //const lastObj = webhook_data.at(-1);
  const lastObj = req.body;

  await paypalFee.captureWebhook(lastObj);

  if (lastObj.resource_type === 'subscription') {
    await paypalFee.captureSubscription(lastObj, res);
  } else if (lastObj.resource_type === 'sale') {
    await paypalFee.captureSale(lastObj, res);
  } else {
    return res.send(200);
  }
});

/* 
// Remove command to show json in browser

router.get('/webhook/subscription', (req, res) => {
  res.send(webhook_data);
});
 */
router.post('/orders', async (req, res) => {
  let variant = req.body.ids;
  let carttotal = req.body.carttotal;

  let ids = variant.map((obj) => obj.id);
  let products = await Products.find({ _id: { $in: ids } });
  let price = 0;
  let found = 0;
  let prices = variant.map((obj) => obj.price);
  let movenext = true;
  products.map((obj) => {
    if (ids.includes(obj._id.toString())) {
      movenext = true;
      let index = ids.indexOf(obj._id.toString());
      obj.variants.map((element) => {
        console.log('element price', element.price);
        console.log('index price', prices[index]);
        if (element.price == prices[index] && movenext) {
          price = price + prices[index];
          found++;
          movenext = false;
        }
      });
    }
  });

  if (price > carttotal) {
    return res.send('Invalid request');
  }
  const order = await paypal.createOrder(carttotal);
  res.json(order);
});

router.post('/orders/:orderId/capture', async (req, res) => {
  const { orderId } = req.params;
  const captureData = await paypal.capturePayment(orderId);
  res.json(captureData);
});

router.post('/ordersfee/:orderId/capture', async (req, res) => {
  const { orderId } = req.params;
  const captureData = await paypalFee.capturePayment(orderId);
  res.json(captureData);
});

router.route('/cashpayment').post(auth, paymentCtrl.createCashPayment);
router.route('/guestcashpayment').post(paymentCtrl.guestCreateCashPayment);
router.route('/paypalpayment').post(auth, paymentCtrl.createPayPalPayment);
router.route('/guestpaypalpayment').post(paymentCtrl.guestCreatePayPalPayment);

router
  .route('/calculatefee')
  .get(auth, authMinSupport, paymentCtrl.getCalculatedPayFees);

router.route('/distance').get(distanceCtrl.getDistance);

router.route('/printOut').post(auth, authMinSupport, printerCtrl.printOut);

module.exports = router;
