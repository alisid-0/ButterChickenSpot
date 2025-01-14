import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orderNote, setOrderNote] = useState('');

  const addToCart = (item, quantity = 1, specialInstructions = '') => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        cartItem => cartItem.id === item.id && 
        cartItem.specialInstructions === specialInstructions
      );

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem === existingItem
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }

      return [...prevCart, { ...item, quantity, specialInstructions }];
    });
  };

  const removeFromCart = (itemId, specialInstructions = '') => {
    setCart(prevCart => 
      prevCart.filter(item => 
        !(item.id === itemId && item.specialInstructions === specialInstructions)
      )
    );
  };

  const updateQuantity = (itemId, quantity, specialInstructions = '') => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId && item.specialInstructions === specialInstructions
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setOrderNote('');
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.discountPrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <OrderContext.Provider
      value={{
        cart,
        orderNote,
        setOrderNote,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}; 