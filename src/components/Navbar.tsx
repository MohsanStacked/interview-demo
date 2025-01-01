import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useCart();
  return (
    <>
      <nav className="bg-gray-800 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <NavLink to="/" className="text-lg font-bold">
            ShopEase
          </NavLink>
          <div className="space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-blue-400 hover:underline' : 'hover:underline'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? 'text-blue-400 hover:underline' : 'hover:underline'
              }
            >
              Cart ({cart.length})
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? 'text-blue-400 hover:underline' : 'hover:underline'
              }
            >
              Profile
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
