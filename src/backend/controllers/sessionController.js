import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51QbR7o02i3Jx8geObzMqBpsoHWV0KPSASlw4hTGzjMM5B30kTWrbMZ8da2KO3cMK5uD0PgNGTVkYnEb34H4566H500NqNs2ZlU'
);

const createCheckoutSession = async (req, res) => {
  try {
    const { cartItems } = req.body || {}; // Fallback if req.body is undefined
    console.log('Cart items:', cartItems);
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create session' });
  }
};

export { createCheckoutSession };
