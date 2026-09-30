import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import api from '../../utils/api';

// ==================== FETCH WALLET ====================
export const fetchWallet = createAsyncThunk(
  'wallet/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/wallet');
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch wallet'
      );
    }
  }
);

// ==================== DEPOSIT ====================
export const deposit = createAsyncThunk(
  'wallet/deposit',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.post('/wallet/deposit', payload);
      toast.success('Deposit successful!');
      dispatch(fetchWallet());
      return data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Deposit failed';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// ==================== WITHDRAW ====================
export const withdraw = createAsyncThunk(
  'wallet/withdraw',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.post('/wallet/withdraw', payload);
      toast.success('Withdrawal initiated!');
      dispatch(fetchWallet());
      return data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Withdrawal failed';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// ==================== SLICE ====================
const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    wallet: null,
    transactions: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearWalletError: (state) => {
      state.error = null;
    },
    updateBalance: (state, action) => {
      if (state.wallet) {
        state.wallet.balance = action.payload.balance;
        if (action.payload.lockedBalance !== undefined) {
          state.wallet.lockedBalance = action.payload.lockedBalance;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wallet
      .addCase(fetchWallet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wallet = action.payload.wallet;
        state.transactions = action.payload.recentTrades || [];
      })
      .addCase(fetchWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Deposit
      .addCase(deposit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deposit.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.wallet) {
          state.wallet = action.payload.wallet;
        }
      })
      .addCase(deposit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Withdraw
      .addCase(withdraw.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(withdraw.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.wallet) {
          state.wallet = action.payload.wallet;
        }
      })
      .addCase(withdraw.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWalletError, updateBalance } = walletSlice.actions;
export default walletSlice.reducer;