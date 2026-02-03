import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  selectTotalQuantity,
  selectTotalAmount,
  selectTotalSKUs,
} from '../src/store/slices/cartSlice';
import type {Product} from '../src/types/product';

describe('Cart Slice', () => {
  const mockProduct1: Product = {
    id: 1,
    name: 'Paracetamol 500mg',
    price: 15000,
    category: 'Pain Relief',
    isPrescription: false,
  };

  const mockProduct2: Product = {
    id: 2,
    name: 'Amoxicillin 500mg',
    price: 45000,
    category: 'Antibiotic',
    isPrescription: true,
  };

  const initialState = {
    items: [],
  };

  describe('Cart Actions', () => {
    it('should add a new item to cart', () => {
      const state = cartReducer(initialState, addToCart(mockProduct1));
      expect(state.items).toHaveLength(1);
      expect(state.items[0].product).toEqual(mockProduct1);
      expect(state.items[0].quantity).toBe(1);
    });

    it('should increment quantity when adding existing item', () => {
      let state = cartReducer(initialState, addToCart(mockProduct1));
      state = cartReducer(state, addToCart(mockProduct1));
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(2);
    });

    it('should not exceed maximum quantity of 99', () => {
      let state = {
        items: [{product: mockProduct1, quantity: 99}],
      };
      state = cartReducer(state, addToCart(mockProduct1));
      expect(state.items[0].quantity).toBe(99);
    });

    it('should decrement quantity when removing item', () => {
      let state = cartReducer(initialState, addToCart(mockProduct1));
      state = cartReducer(state, addToCart(mockProduct1));
      state = cartReducer(state, removeFromCart(mockProduct1.id));
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(1);
    });

    it('should remove item when quantity reaches 0', () => {
      let state = cartReducer(initialState, addToCart(mockProduct1));
      state = cartReducer(state, removeFromCart(mockProduct1.id));
      expect(state.items).toHaveLength(0);
    });

    it('should update quantity directly', () => {
      let state = cartReducer(initialState, addToCart(mockProduct1));
      state = cartReducer(
        state,
        updateQuantity({productId: mockProduct1.id, quantity: 5}),
      );
      expect(state.items[0].quantity).toBe(5);
    });

    it('should remove item when updating quantity to 0', () => {
      let state = cartReducer(initialState, addToCart(mockProduct1));
      state = cartReducer(
        state,
        updateQuantity({productId: mockProduct1.id, quantity: 0}),
      );
      expect(state.items).toHaveLength(0);
    });

    it('should not allow quantity above 99', () => {
      let state = cartReducer(initialState, addToCart(mockProduct1));
      state = cartReducer(
        state,
        updateQuantity({productId: mockProduct1.id, quantity: 100}),
      );
      expect(state.items[0].quantity).toBe(1);
    });

    it('should clear all items from cart', () => {
      let state = cartReducer(initialState, addToCart(mockProduct1));
      state = cartReducer(state, addToCart(mockProduct2));
      state = cartReducer(state, clearCart());
      expect(state.items).toHaveLength(0);
    });
  });

  describe('Cart Selectors', () => {
    it('should calculate total quantity correctly', () => {
      const mockState = {
        cart: {
          items: [
            {product: mockProduct1, quantity: 3},
            {product: mockProduct2, quantity: 5},
          ],
        },
      } as any;

      const totalQuantity = selectTotalQuantity(mockState);
      expect(totalQuantity).toBe(8);
    });

    it('should calculate total amount correctly', () => {
      const mockState = {
        cart: {
          items: [
            {product: mockProduct1, quantity: 2},
            {product: mockProduct2, quantity: 3},
          ],
        },
      } as any;

      const totalAmount = selectTotalAmount(mockState);
      expect(totalAmount).toBe(165000);
    });

    it('should calculate total SKUs correctly', () => {
      const mockState = {
        cart: {
          items: [
            {product: mockProduct1, quantity: 10},
            {product: mockProduct2, quantity: 5},
          ],
        },
      } as any;

      const totalSKUs = selectTotalSKUs(mockState);
      expect(totalSKUs).toBe(2);
    });

    it('should return 0 for empty cart totals', () => {
      const mockState = {
        cart: {
          items: [],
        },
      } as any;

      expect(selectTotalQuantity(mockState)).toBe(0);
      expect(selectTotalAmount(mockState)).toBe(0);
      expect(selectTotalSKUs(mockState)).toBe(0);
    });

    it('should handle single item cart correctly', () => {
      const mockState = {
        cart: {
          items: [{product: mockProduct1, quantity: 7}],
        },
      } as any;

      expect(selectTotalQuantity(mockState)).toBe(7);
      expect(selectTotalAmount(mockState)).toBe(105000);
      expect(selectTotalSKUs(mockState)).toBe(1);
    });
  });
});
