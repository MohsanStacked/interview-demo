import pkg from '@adyen/api-library';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

const { Client, CheckoutAPI } = pkg;

// Set up the client and service'ADYEN_API_KEY'
const client = new Client({
  apiKey: process.env.VITE_ADYEN_API_KI,
  environment: 'TEST',
});
const checkoutAPI = new CheckoutAPI(client);

const createCheckoutSessionRequest = async (req, res) => {
  try {
    const { value, currency } = req.body;
    const orderRef = uuidv4();
    if (!value || !currency)
      return res.status(400).json({ error: 'Missing value or currency' });
    const checkoutSession = {
      merchantAccount: 'AdyenRecruitmentCOM',
      amount: {
        value: value * 100,
        currency: currency,
      },
      additonalDate: {
        allow3dS2: true,
      },
      returnUrl: 'http://localhost:3000/success',
      browserInfo: req.body.browserInfo,
      reference: orderRef,
      countryCode: 'NL',
    };

    const response = await checkoutAPI.PaymentsApi.sessions(checkoutSession, {
      idempotencyKey: uuidv4(),
    });

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to payment checkout' });
  }
};

const getPaymentMethods = async (req, res) => {
  try {
    const response = await checkoutAPI.paymentMethods({
      channel: 'web',
      merchantAccount: 'AdyenRecruitmentCOM',
    });
    res.render('payment', {
      clientKey: process.env.ADYEN_CLIENT_KEY,
      response: JSON.stringify(response),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get payment methods' });
  }
};

const handleRedirectResult = async (req, res) => {
  const payload = {};
  payload['details'] = req.method === 'GET' ? req.query : req.body;

  const orderRef = req.query.orderRef;
  payload['paymentData'] = paymentDataStore[orderRef];
  delete paymentDataStore[orderRef];

  try {
    const response = await checkoutAPI.paymentDetails(payload);
    switch (response.resultCode) {
      case 'Authorised':
        res.redirect('/success');
        break;
      case 'Pending':
      case 'Refused':
        res.redirect('/failed');
        break;
      case 'Received':
        res.redirect('/pending');
        break;
      default:
        res.redirect('/error');
        break;
    }
  } catch (error) {
    console.error(error);
  }
};

const sucess = async (req, res) => {
  res.render('success');
};

const pending = async (req, res) => {
  res.render('pending');
};

const error = async (req, res) => {
  res.render('error');
};

const failed = async (req, res) => {
  res.render('failed');
};

const submitAdditonalData = async function (req, res) {
  const payload = {};
  payload['details'] = req.body.details;
  payload['paymentData'] = req.body.paymentData;

  try {
    const response = await checkoutAPI.paymentDetails(payload);
    let resultCode = response.resultCode;
    let action = response.action || null;

    res.json({ action, resultCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit additional data' });
  }
};

export {
  createCheckoutSessionRequest,
  getPaymentMethods,
  handleRedirectResult,
  sucess,
  pending,
  error,
  failed,
  submitAdditonalData,
};
