import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';

console.log(import.meta.env.VITA_APP);

const stripePromise = loadStripe(
  import.meta.env.VITE_APP_STRIPE_API_PK as string
);

const checkoutPage = () => {
  const { cart } = useCart();

  const handleCheckout = async () => {
    const response = await fetch(
      'http://localhost:3001/api/create-checkout-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: cart,
        }),
      }
    );

    const session = await response.json();

    // Redirect to Stripe Checkout
    const stripe = await stripePromise;
    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      console.error(result.error.message);
    }
  };

  return (
    <>
      <div className="checkout-page container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>

        <h2 className="text-xl font-semibold">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <span>
              {item.title} x {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <button
          onClick={handleCheckout}
          className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 mt-4"
        >
          Proceed to Payment
        </button>
      </div>
    </>
  );
};

export default checkoutPage;
