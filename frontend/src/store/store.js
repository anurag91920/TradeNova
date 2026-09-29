import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import tradeReducer from './slices/tradeSlice.js';
import walletReducer from './slices/walletSlice.js';
import marketReducer from './slices/marketSlice.js';
import uiReducer from './slices/uiSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trade: tradeReducer,
    wallet: walletReducer,
    market: marketReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;