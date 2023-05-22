// src/context/state.js
import { createContext, useContext, useEffect, useState } from 'react';
import CoCartAPI from '@cocart/cocart-rest-api';

export const CartContext = createContext(null);

export function CartWrapper({ children }) {
  const [cartValue, setCartValue] = useState(null);

  useEffect(() => {
    let cart_key = '';
    if (typeof window !== 'undefined') {
      cart_key = localStorage.getItem('cart_key');
    }
    const CoCart = new CoCartAPI({
      url: 'https://checkout.hhcparis.fr',
      version: 'cocart/v2',
    });
    CoCart.get(`cart?cart_key=${cart_key}`)
      .then((response) => {
        setCartValue(response.data); // adjust this based on the actual response structure
      })
      .catch((error) => {
        console.log('Response Data:', error.response.data);
      });
  }, []);

  return <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>;
}

export function useAppContext() {
  return useContext(CartContext);
}
