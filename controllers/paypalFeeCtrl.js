const fetch = require('node-fetch');
const SubStatus = require('../models/subscriptionStatusModel');
const SubHistory = require('../models/subscriptionHistoryModel');
const WebhookHistory = require('../models/paypalWebhookData');

const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;
//const base = 'https://api-m.sandbox.paypal.com';
const base = 'https://api.paypal.com';

async function createSubscription(planId) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v1/billing/subscriptions`;
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: 'subscription',
      plan_id: planId,
    }),
  });
  const data = await response.json();
  console.log('data', data);
  return data;
}

async function captureSubscription(subDataObj, res) {
  try {
    let StatusObj = await SubStatus.findOne({
      subscriptionID: subDataObj.resource.id,
    });

    if (subDataObj.event_type === 'BILLING.SUBSCRIPTION.CREATED') {
      if (StatusObj) {
        return res.json({ msg: 'Subscription ID already in use' });
      } else {
        let newStatusId = new SubStatus({
          subscriptionID: subDataObj.resource.id,
          subscriptionStatus: subDataObj.event_type,
        });
        await newStatusId.save();
        return res.json({ msg: 'Subscription created' });
      }
    } else if (subDataObj.event_type === 'BILLING.SUBSCRIPTION.ACTIVATED') {
      if (StatusObj) {
        await SubStatus.findOneAndUpdate(
          { subscriptionID: subDataObj.resource.id },
          {
            subscriptionStatus: subDataObj.event_type,
          }
        );
        return res.json({ msg: 'Subscription activated' });
      } else {
        return res.json({ msg: 'Subscription ID not in system' });
      }
    } else if (subDataObj.event_type === 'BILLING.SUBSCRIPTION.EXPIRED') {
      if (StatusObj) {
        await SubStatus.findOneAndUpdate(
          { subscriptionID: subDataObj.resource.id },
          {
            subscriptionStatus: subDataObj.event_type,
          }
        );
        return res.json({ msg: 'Subscription expired' });
      } else {
        return res.json({ msg: 'Subscription ID not in system' });
      }
    } else if (subDataObj.event_type === 'BILLING.SUBSCRIPTION.CANCELLED') {
      if (StatusObj) {
        await SubStatus.findOneAndUpdate(
          { subscriptionID: subDataObj.resource.id },
          {
            subscriptionStatus: subDataObj.event_type,
          }
        );
        return res.json({ msg: 'Subscription cancelled' });
      } else {
        return res.json({ msg: 'Subscription ID not in system' });
      }
    } else if (subDataObj.event_type === 'BILLING.SUBSCRIPTION.SUSPENDED	') {
      if (StatusObj) {
        await SubStatus.findOneAndUpdate(
          { subscriptionID: subDataObj.resource.id },
          {
            subscriptionStatus: subDataObj.event_type,
          }
        );
        return res.json({ msg: 'Subscription suspended' });
      } else {
        return res.json({ msg: 'Subscription ID not in system' });
      }
    } else {
      return res.json({ msg: 'event_type ignored' });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}
async function captureSale(saleDataObj, res) {
  try {
    if (saleDataObj.event_type === 'PAYMENT.SALE.COMPLETED') {
      const preSale = await SubHistory.findOne({
        date: saleDataObj.create_time,
      });
      if (preSale) {
        return res.json({ msg: 'Payment already exist' });
      }
      let newHistoryObj = new SubHistory({
        date: saleDataObj.create_time,
        subscriptionID: saleDataObj.resource.billing_agreement_id,
        amount: saleDataObj.resource.amount.total,
      });
      await newHistoryObj.save();

      return res.json({ msg: 'Gebühren erfolgreich aktualisiert' });
    } else {
      return res.json({ msg: 'event_type ignored' });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}

async function captureWebhook(saleDataObj) {
  try {
    const alreadyExist = await WebhookHistory.findOne({
      date: saleDataObj.create_time,
    });

    if (alreadyExist) {
      return;
    }
    let newWebhookObj = new WebhookHistory({
      data: saleDataObj,
    });
    await newWebhookObj.save();
  } catch (err) {}
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
  console.log(data);
  return data.access_token;
}

module.exports = {
  createSubscription,
  captureSubscription,
  captureSale,
  captureWebhook,
};
