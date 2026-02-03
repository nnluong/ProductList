import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../index';
import type {Product, CartItem} from '../../types/product';
import {MAX_QUANTITY, MIN_QUANTITY} from '../../types/product';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        item => item.product.id === action.payload.id,
      );

      if (existingItem) {
        if (existingItem.quantity < MAX_QUANTITY) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({
          product: action.payload,
          quantity: 1,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find(
        item => item.product.id === action.payload,
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            item => item.product.id !== action.payload,
          );
        }
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{productId: number; quantity: number}>,
    ) => {
      const {productId, quantity} = action.payload;

      if (quantity < MIN_QUANTITY || quantity > MAX_QUANTITY) {
        return;
      }

      const existingItem = state.items.find(
        item => item.product.id === productId,
      );

      if (existingItem) {
        if (quantity === 0) {
          state.items = state.items.filter(
            item => item.product.id !== productId,
          );
        } else {
          existingItem.quantity = quantity;
        }
      }
    },

    clearCart: state => {
      state.items = [];
    },

    hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemQuantity = (productId: number) => (state: RootState) => {
  const item = state.cart.items.find((item: CartItem) => item.product.id === productId);
  return item ? item.quantity : 0;
};

export const selectTotalQuantity = (state: RootState) => {
  return state.cart.items.reduce((total: number, item: CartItem) => total + item.quantity, 0);
};

export const selectTotalSKUs = (state: RootState) => {
  return state.cart.items.length;
};

export const selectTotalAmount = (state: RootState) => {
  return state.cart.items.reduce(
    (total: number, item: CartItem) => total + item.product.price * item.quantity,
    0,
  );
};

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  hydrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;
