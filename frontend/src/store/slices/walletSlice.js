import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const fetchWallet = createAsyncThunk('wallet/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/api/wallet');
    return data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const deposit = createAsyncThunk('wallet/deposit', async (payload, { dispatch }) => {
  const { data } = await axios.post('/api/wallet/deposit', payload);
  toast.success('Deposit successful!');
  dispatch(fetchWallet());
  return data.data;
});

export const withdraw = createAsyncThunk('wallet/withdraw', async (payload, { dispatch }) => {
  const { data } = await axios.post('/api/wallet/withdraw', payload);
  toast.success('Withdrawal initiated!');
  dispatch(fetchWallet());
  return data.data;
});

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    wallet: null,
    transactions: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallet.pending, (state) => { state.isLoading = true; })
      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wallet = action.payload.wallet;
        state.transactions = action.payload.recentTrades || [];
      })
      .addCase(fetchWallet.rejected, (state) => { state.isLoading = false; });
  },
});

export default walletSlice.reducer;