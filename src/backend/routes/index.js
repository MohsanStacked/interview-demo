import express from 'express';
import sessionRoute from './sessionRoute.js';
import productRoute from './productRoute.js';
import adyenSessionRoute from './adyenSessionRoute.js';
const router = express.Router();

// Combine all routes
router.use('/products', productRoute);
router.use('/checkout', sessionRoute);
router.use('/adyen-checkout', adyenSessionRoute);

export default router;
