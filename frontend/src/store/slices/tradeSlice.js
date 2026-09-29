import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const fetchOrders = createAsyncThunk('trade/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/api/trades/orders');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const fetchPositions = createAsyncThunk('trade/fetchPositions', async () => {
  const { data } = await axios.get('/api/trades/positions');
  return data.data;
});

export const fetchHistory = createAsyncThunk('trade/fetchHistory', async () => {
  const { data } = await axios.get('/api/trades/history');
  return data.data;
});

export const createOrder = createAsyncThunk('trade/createOrder', async (payload, { dispatch }) => {
  const { data } = await axios.post('/api/trades/order', payload);
  toast.success('Order placed successfully!');
  dispatch(fetchOrders());
  dispatch(fetchPositions());
  return data.data;
});

export const cancelOrder = createAsyncThunk('trade/cancelOrder', async (id, { dispatch }) => {
  await axios.delete(`/api/trades/orders/${id}`);
  toast.success('Order cancelled');
  dispatch(fetchOrders());
  dispatch(fetchPositions());
});

const tradeSlice = createSlice({
  name: 'trade',
  initialState: {
    orders: [],
    positions: [],
    history: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload.data;
      })
      .addCase(fetchPositions.fulfilled, (state, action) => {
        state.positions = action.payload;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      });
  },
});

export default tradeSlice.reducer;