import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Home, User } from 'lucide-react';

const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav className="bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Brand Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold flex items-center space-x-2 hover:opacity-90 transition-opacity"
        >
          <span>ShopEase</span>
        </NavLink>

        {/* Navigation Links */}
        <div className="flex space-x-6 items-center">
          {/* Home Link */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-lg font-medium ${
                isActive ? 'text-yellow-300' : 'hover:text-yellow-100'
              }`
            }
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </NavLink>

          {/* Cart Link */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-lg font-medium ${
                isActive ? 'text-yellow-300' : 'hover:text-yellow-100'
              }`
            }
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart ({cart.length})</span>
          </NavLink>

          {/* Profile Link */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-lg font-medium ${
                isActive ? 'text-yellow-300' : 'hover:text-yellow-100'
              }`
            }
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
