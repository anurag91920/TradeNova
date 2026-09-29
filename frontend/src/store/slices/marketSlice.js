import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPrices = createAsyncThunk('market/fetchPrices', async (symbols) => {
  const promises = symbols.map(symbol =>
    axios.get(`/api/trades/market/price/${symbol}`).catch(() => null)
  );
  const results = await Promise.all(promises);
  return results.filter(r => r?.data?.success).map(r => r.data.data);
});

const marketSlice = createSlice({
  name: 'market',
  initialState: {
    prices: {},
    symbols: ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'ADAUSDT'],
    connected: false,
  },
  reducers: {
    updatePrice: (state, action) => {
      const { symbol, price } = action.payload;
      state.prices[symbol] = price;
    },
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPrices.fulfilled, (state, action) => {
      action.payload.forEach(p => {
        state.prices[p.symbol] = p.price;
      });
    });
  },
});

export const { updatePrice, setConnected } = marketSlice.actions;
export default marketSlice.reducer;