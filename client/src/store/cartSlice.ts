import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '.';
import api from '../api/axios';

export interface CartItem {
  _id: string;
  quantity: number;
  productId: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
}

export interface CartState {
  items: CartItem[];
  status: 'idle';
}

const initialState: CartState = {
  items: [],
  status: 'idle',
};

export const fetchCart = createAsyncThunk('cart/fetch', async () => {
  const res = await api.get('/cart');
  return res.data;
});

export const addToCart = createAsyncThunk(
  'cart/add',
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    await api.post('/cart', { productId, quantity });
    const res = await api.get('/cart');
    return res.data;
  }
);

export const updateQuantity = createAsyncThunk(
  'cart/update',
  async ({ id, quantity }: { id: string; quantity: number }) => {
    await api.put(`/cart/${id}`, { quantity });
    const res = await api.get('/cart');
    return res.data;
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/remove',
  async (productId: string) => {
    await api.delete(`/cart/${productId}`);
    const res = await api.get('/cart');
    return res.data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
