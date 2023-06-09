import { create } from 'zustand';
import CoCartAPI from '@cocart/cocart-rest-api';

const CoCart = new CoCartAPI({
  url: 'https://checkout.hhcparis.fr',
  version: 'cocart/v2',
});

export const useItemsStore = create((set) => ({
  items: 0,
  addItem: () => set((state) => ({ items: state.items + 1 })),
  removeItem: () => set((state) => ({ items: state.items - 1 })),
  reset: () => set({ items: 0 }),
  setItems: (items) => set({ items: items }),
}));

export const useCartStore = create((set) => ({
  cart: {},
  removeCard: () => set({ cart: {} }),
  fetch: async () => {
    let cart_key = '';
    let endpoint = 'cart';
    if (typeof window !== 'undefined') {
      cart_key = localStorage.getItem('cart_key');
    }
    if (cart_key) {
      endpoint = `cart?cart_key=${cart_key}`;
    }
    const response = await CoCart.get(endpoint);
    await set({ cart: response.data });
    localStorage.setItem('cart_key', response.data.cart_key);
  },
}));
