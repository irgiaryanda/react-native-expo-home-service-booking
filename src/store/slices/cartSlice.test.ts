import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  CartItem,
} from './cartSlice';
import type { Service } from '../../api/services';

const mockService: Service = {
  id: 'svc-001',
  name: 'House Cleaning',
  description: 'Complete house cleaning',
  price: 150000,
  duration: '3-4 hours',
  category: 'cleaning',
};

const mockService2: Service = {
  id: 'svc-002',
  name: 'AC Repair',
  description: 'Professional AC repair',
  price: 250000,
  duration: '1-2 hours',
  category: 'repair',
};

describe('cartSlice', () => {
  const initialState = {
    items: [] as CartItem[],
    totalPrice: 0,
  };

  describe('addToCart', () => {
    it('should add a new item to empty cart', () => {
      const state = cartReducer(initialState, addToCart(mockService));
      
      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe(mockService.id);
      expect(state.items[0].quantity).toBe(1);
      expect(state.totalPrice).toBe(150000);
    });

    it('should increment quantity when adding existing item', () => {
      const stateWithItem = {
        items: [{ ...mockService, quantity: 1 }] as CartItem[],
        totalPrice: 150000,
      };
      
      const state = cartReducer(stateWithItem, addToCart(mockService));
      
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(2);
      expect(state.totalPrice).toBe(300000);
    });

    it('should add multiple different items', () => {
      let state = cartReducer(initialState, addToCart(mockService));
      state = cartReducer(state, addToCart(mockService2));
      
      expect(state.items).toHaveLength(2);
      expect(state.totalPrice).toBe(400000);
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart', () => {
      const stateWithItems = {
        items: [
          { ...mockService, quantity: 1 },
          { ...mockService2, quantity: 2 },
        ] as CartItem[],
        totalPrice: 650000,
      };
      
      const state = cartReducer(stateWithItems, removeFromCart(mockService.id));
      
      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe(mockService2.id);
      expect(state.totalPrice).toBe(500000);
    });

    it('should update total price after removal', () => {
      const stateWithItems = {
        items: [{ ...mockService, quantity: 3 }] as CartItem[],
        totalPrice: 450000,
      };
      
      const state = cartReducer(stateWithItems, removeFromCart(mockService.id));
      
      expect(state.items).toHaveLength(0);
      expect(state.totalPrice).toBe(0);
    });
  });

  describe('updateQuantity', () => {
    it('should increase item quantity', () => {
      const stateWithItem = {
        items: [{ ...mockService, quantity: 1 }] as CartItem[],
        totalPrice: 150000,
      };
      
      const state = cartReducer(
        stateWithItem,
        updateQuantity({ id: mockService.id, quantity: 3 })
      );
      
      expect(state.items[0].quantity).toBe(3);
      expect(state.totalPrice).toBe(450000);
    });

    it('should decrease item quantity', () => {
      const stateWithItem = {
        items: [{ ...mockService, quantity: 5 }] as CartItem[],
        totalPrice: 750000,
      };
      
      const state = cartReducer(
        stateWithItem,
        updateQuantity({ id: mockService.id, quantity: 2 })
      );
      
      expect(state.items[0].quantity).toBe(2);
      expect(state.totalPrice).toBe(300000);
    });

    it('should remove item when quantity becomes zero or less', () => {
      const stateWithItem = {
        items: [{ ...mockService, quantity: 1 }] as CartItem[],
        totalPrice: 150000,
      };
      
      const state = cartReducer(
        stateWithItem,
        updateQuantity({ id: mockService.id, quantity: 0 })
      );
      
      expect(state.items).toHaveLength(0);
      expect(state.totalPrice).toBe(0);
    });
  });

  describe('clearCart', () => {
    it('should remove all items from cart', () => {
      const stateWithItems = {
        items: [
          { ...mockService, quantity: 2 },
          { ...mockService2, quantity: 1 },
        ] as CartItem[],
        totalPrice: 550000,
      };
      
      const state = cartReducer(stateWithItems, clearCart());
      
      expect(state.items).toHaveLength(0);
      expect(state.totalPrice).toBe(0);
    });
  });

  describe('totalPrice calculation', () => {
    it('should calculate correct total for single item with quantity', () => {
      let state = cartReducer(initialState, addToCart(mockService));
      state = cartReducer(state, updateQuantity({ id: mockService.id, quantity: 4 }));
      
      expect(state.totalPrice).toBe(600000);
    });

    it('should calculate correct total for multiple items', () => {
      let state = cartReducer(initialState, addToCart(mockService));
      state = cartReducer(state, updateQuantity({ id: mockService.id, quantity: 2 }));
      state = cartReducer(state, addToCart(mockService2));
      
      expect(state.totalPrice).toBe(550000);
    });

    it('should handle complex cart operations correctly', () => {
      let state = cartReducer(initialState, addToCart(mockService));
      state = cartReducer(state, addToCart(mockService));
      state = cartReducer(state, addToCart(mockService2));
      state = cartReducer(state, removeFromCart(mockService.id));
      state = cartReducer(state, updateQuantity({ id: mockService2.id, quantity: 3 }));
      
      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe(mockService2.id);
      expect(state.items[0].quantity).toBe(3);
      expect(state.totalPrice).toBe(750000);
    });
  });
});