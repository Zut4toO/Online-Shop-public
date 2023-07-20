const fetch = require('node-fetch');
const Settings = require('../models/settingsModel');

const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;
// const base = 'https://api-m.sandbox.paypal.com';
const base = 'https://api.paypal.com';

async function createOrder(price) {
  const accessToken = await generateAccessToken();
  const merchantID = await Settings.findOne();
  console.log('Merchant', merchantID.merchantID);
  const url = `${base}/v2/checkout/orders`;
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          description: 'Restaurant',
          amount: {
            currency_code: 'EUR',
            value: price,
          },
          application_context: {
            shipping_preference: 'NO_SHIPPING',
          },
          payee: {
            merchant_id: merchantID.merchantID,
          },
        },
      ],
    }),
  });
  const data = await response.json();
  console.log(data);
  return data;
}

async function capturePayment(orderId) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}

async function generateAccessToken() {
  const response = await fetch(base + '/v1/oauth2/token', {
    method: 'post',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_APP_SECRET).toString(
          'base64'
        ),
    },
  });
  const data = await response.json();
  //response.json(data.access_token);
  return data.access_token;
}

module.exports = { createOrder, capturePayment };
