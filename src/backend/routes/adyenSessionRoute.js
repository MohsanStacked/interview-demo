import express from 'express';
import {
  createCheckoutSessionRequest,
  submitPaymentRequest,
} from '../controllers/adyenSessionController.js';

const router = express.Router();

router.post('/initiatePayment', createCheckoutSessionRequest);
router.post('/submitPayment', submitPaymentRequest);

export default router;
