import dotenv from 'dotenv';
dotenv.config();
import app from './src/app.js';
import { connectDB, sequelize } from './src/config/database.js';
import { createServer } from 'http';
import { initSocket } from './src/socket/index.js';

const PORT = process.env.PORT || 5000;
const server = createServer(app);

// Initialize Socket.io
initSocket(server);

// Connect to MySQL
connectDB();

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('🛑 Shutting down gracefully...');
  await sequelize.close();
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

server.listen(PORT, () => {
  console.log(`🚀 TradeNova Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});