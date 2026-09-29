import { io } from 'socket.io-client';
import { store } from '../store/store';
import { updatePrice, setConnected } from '../store/slices/marketSlice';

let socket = null;

export const initWebSocket = () => {
  if (socket?.connected) return socket;

  const token = localStorage.getItem('accessToken');
  
  socket = io('/', {
    auth: { token },
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    console.log('✅ WebSocket connected');
    store.dispatch(setConnected(true));
    
    const symbols = store.getState().market.symbols;
    socket.emit('subscribe-prices', symbols);
  });

  socket.on('price-update', (data) => {
    store.dispatch(updatePrice(data));
  });

  socket.on('disconnect', () => {
    console.log('❌ WebSocket disconnected');
    store.dispatch(setConnected(false));
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};