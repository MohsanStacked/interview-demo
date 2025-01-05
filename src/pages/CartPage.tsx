import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage = () => {
  const { cart, removeProductFromCart, updateCartQuantity } = useCart();
  const navigate = useNavigate(); // React Router navigation hook

  const handleRemove = (id: number) => {
    removeProductFromCart(id); // Assuming this function removes based on id
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    updateCartQuantity(id, quantity); // Assuming this function updates quantity based on id
  };

  const handleCheckout = () => {
    // Navigate to checkout page and pass cart data as state
    navigate('/checkout', { state: { cart } });
  };

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <>
      <div className="cart-page">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <div className="cart-items">
            {cart.map((item: CartItem) => (
              <div
                key={item.id}
                className="cart-item flex justify-between items-center p-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p>${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="bg-red-500 text-white py-1 px-4 rounded"
                  >
                    Remove
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(
                        item.id,
                        parseInt(e.target.value, 10)
                      )
                    }
                    className="w-16 mx-4 text-center"
                  />
                  <span className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="total">
            <h2 className="text-2xl font-bold mt-4">
              Total: $
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </h2>
          </div>
          <div className="checkout-button mt-6">
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white py-2 px-6 rounded"
            >
              Go to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
