import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  const addToCart = (article) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === article.id);
      let newCart;
      if (existing) {
        newCart = prevCart.map((item) =>
          item.id === article.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        const updatedItem = newCart.find((item) => item.id === article.id);
        setLastUpdated({ ...updatedItem, action: 'add' });
      } else {
        newCart = [...prevCart, { ...article, quantity: 1 }];
        setLastUpdated({ ...article, quantity: 1, action: 'add' });
      }
      return newCart;
    });
  };

  const removeFromCart = (articleId) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === articleId);
      let newCart;
      if (existing) {
        if (existing.quantity > 1) {
          newCart = prevCart.map((item) =>
            item.id === articleId ? { ...item, quantity: item.quantity - 1 } : item
          );
          const updatedItem = newCart.find((item) => item.id === articleId);
          setLastUpdated({ ...updatedItem, action: 'remove' });
        } else {
          newCart = prevCart.filter((item) => item.id !== articleId);
          setLastUpdated({ id: articleId, action: 'remove', removed: true });
        }
      } else {
        newCart = prevCart;
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    setLastUpdated(null);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, lastUpdated }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
