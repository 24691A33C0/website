import React, { createContext, useContext, useState, useEffect } from 'react';
import { businessConfig } from '../config/businessConfig';
import { useToast } from './ToastContext';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'dsbc_cart_items_v2';

export function CartProvider({ children }) {
  const { addToast } = useToast();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      return [];
    }
  });

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  const addToCart = (item, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });

    addToast(`Added "${item.name}" to your tray!`, 'success');
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const target = prevItems.find((i) => i.id === itemId);
      if (target) {
        addToast(`Removed "${target.name}" from tray`, 'terracotta');
      }
      return prevItems.filter((item) => item.id !== itemId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculations
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Configurable fees (disabled by default per prompt specifications)
  const taxPercent = businessConfig.orderingPolicy.taxRatePercent || 0;
  const taxAmount = Math.round((subtotal * taxPercent) / 100);
  const deliveryFee = businessConfig.orderingPolicy.deliveryFee || 0;
  const grandTotal = subtotal + taxAmount + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        taxAmount,
        deliveryFee,
        taxPercent,
        grandTotal,
        currencySymbol: businessConfig.orderingPolicy.currencySymbol || '₹'
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
