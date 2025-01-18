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
const orderRef = uuidv4();

const createCheckoutSessionRequest = async (req, res) => {
  try {
    const { value, currency } = req.body;
    if (!value || !currency)
      return res.status(400).json({ error: 'Missing value or currency' });
    const checkoutSession = {
      merchantAccount: 'AdyenRecruitmentCOM',
      amount: {
        value: value * 100,
        currency: currency,
      },
      authenticationData: {
        threeDSRequestData: {
          nativeThreeDS: 'preferred',
        },
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

const submitPaymentRequest = async (req, res) => {
  try {
    const paymentData = req.body;
    const paymentRequest = {
      reference: orderRef,
      amount: {
        value: 3434,
        currency: 'EUR',
      },
      merchantAccount: 'AdyenRecruitmentCOM',
      paymentMethod: paymentData.paymentMethod,
      returnUrl: 'http://localhost:3000/success',
      browserInfo: paymentData.browserInfo,
      origin: paymentData.origin,
      shopperIP: req.ip,
      shopperEmail: '123@gmail.com',
    };
    const response = await checkoutAPI.PaymentsApi.payments(paymentRequest, {
      idempotencyKey: uuidv4(),
    });
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit payment' });
  }
};

export { createCheckoutSessionRequest, submitPaymentRequest };
