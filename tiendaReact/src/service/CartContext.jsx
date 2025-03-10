// CartContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Estado del carrito: cada item tiene { id, title, price, quantity, image, ... }
  const [cart, setCart] = useState([]);

  // Agrega un artículo. Si ya existe, incrementa la cantidad.
  const addToCart = (article) => {
    
    setCart(prevCart => {
      console.log(prevCart)
      const existingItem = prevCart.find(item => item.id === article.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === article.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...article, quantity: 1 }];
    });
  };

  // Quita un artículo completamente del carrito
  const removeFromCart = (articleId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== articleId));
  };

  // Actualiza la cantidad de un artículo
  const updateCartItem = (articleId, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === articleId ? { ...item, quantity } : item
      )
    );
  };

  // Vacía el carrito
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
