import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image_url: string;
}

const CartPage = () => {
  const { cart, removeProductFromCart, updateCartQuantity } = useCart();
  const navigate = useNavigate();

  const handleRemove = (id: number) => {
    removeProductFromCart(id);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    updateCartQuantity(id, quantity);
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart } });
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-semibold text-gray-800">
          Your cart is currently empty.
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Your Cart
        </h1>

        {/* Cart Items */}
        <div className="space-y-6">
          {cart.map((item: CartItem) => (
            <div
              key={item.id}
              className="cart-item flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
            >
              {/* Item Details */}
              <div className="flex items-center space-x-4">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>

              {/* Quantity and Price */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-600 text-white py-1 px-4 rounded-lg hover:bg-red-700 transition duration-200"
                >
                  Remove
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value, 10))
                  }
                  className="w-20 px-2 py-1 text-center border rounded-md shadow-sm"
                />
                <span className="font-semibold text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Total */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900">
            Total: $
            {cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </h2>
        </div>

        {/* Checkout Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
