import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger.js';
import { cryptoService } from '../services/crypto.service.js';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true
    },
    pingTimeout: 60000,
    pingInterval: 25000
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    
    if (!token) {
      socket.userId = null;
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (error) {
      socket.userId = null;
      next();
    }
  });

  io.on('connection', (socket) => {
    logger.info(`🔌 Socket connected: ${socket.id} | User: ${socket.userId || 'guest'}`);

    const subscriptions = new Set();

    socket.on('subscribe-prices', async (symbols) => {
      try {
        if (!Array.isArray(symbols)) symbols = [symbols];

        for (const symbol of symbols) {
          const room = `price_${symbol}`;
          socket.join(room);
          subscriptions.add(room);

          try {
            const price = await cryptoService.getMarketPrice(symbol);
            socket.emit('price-update', { symbol, price, timestamp: Date.now() });
          } catch (err) {
            logger.warn(`Could not fetch price for ${symbol}`);
          }
        }

        logger.info(`User ${socket.userId || socket.id} subscribed to: ${symbols.join(', ')}`);
      } catch (error) {
        logger.error('Subscribe prices error:', error);
        socket.emit('error', { message: 'Failed to subscribe to prices' });
      }
    });

    socket.on('unsubscribe-prices', (symbols) => {
      if (!Array.isArray(symbols)) symbols = [symbols];
      symbols.forEach(symbol => {
        const room = `price_${symbol}`;
        socket.leave(room);
        subscriptions.delete(room);
      });
    });

    socket.on('get-market-data', async (symbol) => {
      try {
        const stats = await cryptoService.get24hrStats(symbol);
        socket.emit('market-data', { symbol, stats, timestamp: Date.now() });
      } catch (error) {
        socket.emit('error', { message: 'Failed to fetch market data' });
      }
    });

    socket.on('disconnect', () => {
      logger.info(`🔌 Socket disconnected: ${socket.id}`);
      subscriptions.clear();
    });
  });

  // Broadcast price updates
  const priceUpdateInterval = setInterval(async () => {
    try {
      const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'ADAUSDT'];
      for (const symbol of symbols) {
        try {
          const price = await cryptoService.getMarketPrice(symbol);
          io.to(`price_${symbol}`).emit('price-update', {
            symbol,
            price,
            timestamp: Date.now()
          });
        } catch (err) {
          // Silently continue if API fails
        }
      }
    } catch (error) {
      logger.error('Price update broadcast error:', error.message);
    }
  }, 10000); // Every 10 seconds

  server.on('close', () => {
    clearInterval(priceUpdateInterval);
  });

  return io;
};

export const getSocketIO = () => io;