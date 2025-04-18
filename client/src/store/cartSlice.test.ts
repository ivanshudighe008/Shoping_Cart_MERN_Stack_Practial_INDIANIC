import cartReducer, {
    CartItem,
    CartState ,
  } from './cartSlice';
  import {
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
  } from './cartSlice';
  
  const mockItems: CartItem[] = [
    {
      _id: 'cart1',
      quantity: 2,
      productId: {
        _id: 'prod1',
        name: 'Test Product 1',
        price: 25,
        image: 'placeholder.jpg',
      },
    },
    {
      _id: 'cart2',
      quantity: 1,
      productId: {
        _id: 'prod2',
        name: 'Test Product 2',
        price: 50,
        image: 'placeholder.jpg',
      },
    },
  ];
  
  describe('cartSlice', () => {
    const initialState: CartState  = {
      items: [],
      status: 'idle' as const,
    };
  
    it('should return the initial state', () => {
      expect(cartReducer(undefined, { type: '' })).toEqual(initialState);
    });
  
    it('should handle fetchCart.fulfilled', () => {
      const action = {
        type: fetchCart.fulfilled.type,
        payload: mockItems,
      };
      const state = cartReducer(initialState, action);
      expect(state.items.length).toBe(2);
      expect(state.items[0].productId.name).toBe('Test Product 1');
    });
  
    it('should handle addToCart.fulfilled', () => {
      const action = {
        type: addToCart.fulfilled.type,
        payload: mockItems,
      };
      const state = cartReducer(initialState, action);
      expect(state.items[1].productId.price).toBe(50);
    });
  
    it('should handle updateQuantity.fulfilled', () => {
      const action = {
        type: updateQuantity.fulfilled.type,
        payload: [
          {
            _id: 'cart1',
            quantity: 5,
            productId: {
              _id: 'prod1',
              name: 'Test Product 1',
              price: 25,
              image: 'placeholder.jpg',
            },
          },
        ],
      };
      const state = cartReducer(initialState, action);
      expect(state.items[0].quantity).toBe(5);
    });
  
    it('should handle removeFromCart.fulfilled', () => {
      const action = {
        type: removeFromCart.fulfilled.type,
        payload: [],
      };
      const state = cartReducer({ ...initialState, items: mockItems }, action);
      expect(state.items).toHaveLength(0);
    });
  });
  