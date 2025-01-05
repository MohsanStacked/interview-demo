import React, { useState, ReactNode } from 'react';
import CartContext from './CartContext';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductToCart: addToCart,
        removeProductFromCart: removeFromCart,
        updateCartQuantity: updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
