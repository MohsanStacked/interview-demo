import { createContext, useContext } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: Product[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
