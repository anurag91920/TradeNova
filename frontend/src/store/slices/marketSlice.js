import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// ==================== FETCH PRICES ====================
export const fetchPrices = createAsyncThunk(
  'market/fetchPrices',
  async (symbols, { rejectWithValue }) => {
    try {
      const promises = symbols.map((symbol) =>
        api.get(`/trades/market/price/${symbol}`).catch(() => null)
      );
      const results = await Promise.all(promises);
      return results
        .filter((r) => r?.data?.success)
        .map((r) => r.data.data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch prices'
      );
    }
  }
);

// ==================== FETCH KLINES ====================
export const fetchKlines = createAsyncThunk(
  'market/fetchKlines',
  async ({ symbol, interval = '1h', limit = 100 }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/trades/market/klines/${symbol}?interval=${interval}&limit=${limit}`
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch klines'
      );
    }
  }
);

// ==================== SLICE ====================
const marketSlice = createSlice({
  name: 'market',
  initialState: {
    prices: {},
    klines: {},
    symbols: ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'ADAUSDT'],
    connected: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    updatePrice: (state, action) => {
      const { symbol, price } = action.payload;
      state.prices[symbol] = price;
    },
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    clearMarketError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Prices
      .addCase(fetchPrices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.isLoading = false;
        action.payload.forEach((p) => {
          if (p?.symbol && p?.price) {
            state.prices[p.symbol] = p.price;
          }
        });
      })
      .addCase(fetchPrices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch Klines
      .addCase(fetchKlines.fulfilled, (state, action) => {
        const { symbol } = action.meta.arg;
        state.klines[symbol] = action.payload;
      });
  },
});

export const { updatePrice, setConnected, clearMarketError } = marketSlice.actions;
export default marketSlice.reducer;