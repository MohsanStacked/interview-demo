import express from 'express';
import {
  createCheckoutSessionRequest,
  error,
  failed,
  getPaymentMethods,
  handleRedirectResult,
  pending,
  sucess,
} from '../controllers/adyenSessionController.js';

const router = express.Router();

router.get('/', getPaymentMethods);
router.post('/initiatePayment', createCheckoutSessionRequest);
router.all('/handleShopperRedirect', handleRedirectResult);
router.get('/success', sucess);
router.get('/pending', pending);
router.get('/error', error);
router.get('/failed', failed);
router.post('/submitAdditonalData', handleRedirectResult);

export default router;
