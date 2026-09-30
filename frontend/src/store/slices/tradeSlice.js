import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import api from '../../utils/api';

// ==================== FETCH ORDERS ====================
export const fetchOrders = createAsyncThunk(
  'trade/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/trades/orders');
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch orders'
      );
    }
  }
);

// ==================== FETCH POSITIONS ====================
export const fetchPositions = createAsyncThunk(
  'trade/fetchPositions',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/trades/positions');
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch positions'
      );
    }
  }
);

// ==================== FETCH HISTORY ====================
export const fetchHistory = createAsyncThunk(
  'trade/fetchHistory',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/trades/history');
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch history'
      );
    }
  }
);

// ==================== CREATE ORDER ====================
export const createOrder = createAsyncThunk(
  'trade/createOrder',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.post('/trades/order', payload);
      toast.success('Order placed successfully!');
      dispatch(fetchOrders());
      dispatch(fetchPositions());
      return data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to place order';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// ==================== CANCEL ORDER ====================
export const cancelOrder = createAsyncThunk(
  'trade/cancelOrder',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(`/trades/orders/${id}`);
      toast.success('Order cancelled');
      dispatch(fetchOrders());
      dispatch(fetchPositions());
      return id;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to cancel order';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// ==================== SLICE ====================
const tradeSlice = createSlice({
  name: 'trade',
  initialState: {
    orders: [],
    positions: [],
    history: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearTradeError: (state) => {
      state.error = null;
    },
    resetTradeState: (state) => {
      state.orders = [];
      state.positions = [];
      state.history = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.data;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch Positions
      .addCase(fetchPositions.fulfilled, (state, action) => {
        state.positions = action.payload;
      })

      // Fetch History
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      })

      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Cancel Order
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (o) => o.id !== action.payload
        );
        state.positions = state.positions.filter(
          (p) => p.id !== action.payload
        );
      });
  },
});

export const { clearTradeError, resetTradeState } = tradeSlice.actions;
export default tradeSlice.reducer;