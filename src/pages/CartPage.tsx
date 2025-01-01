import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeProductFromCart, updateCartQuantity } = useCart();

  const handleRemove = (id) => {
    removeProductFromCart(id);
  };

  const handleQuantityChange = (id, quantity) => {
    updateCartQuantity(id, quantity);
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
            {cart.map((item) => (
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
                      handleQuantityChange(item.id, parseInt(e.target.value))
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
        </div>
      </div>
    </>
  );
};

export default CartPage;
