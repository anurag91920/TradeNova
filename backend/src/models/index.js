import { sequelize } from '../config/database.js';
import User from './User.model.js';
import Trade from './Trade.model.js';
import Wallet from './Wallet.model.js';
import Order from './Order.model.js';
import AuditLog from './AuditLog.model.js';

// Define associations
User.hasOne(Wallet, {
  foreignKey: 'user_id',
  as: 'wallet',
  onDelete: 'CASCADE'
});
Wallet.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

User.hasMany(Trade, {
  foreignKey: 'user_id',
  as: 'trades',
  onDelete: 'CASCADE'
});
Trade.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

User.hasMany(Order, {
  foreignKey: 'user_id',
  as: 'orders',
  onDelete: 'CASCADE'
});
Order.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

User.hasMany(AuditLog, {
  foreignKey: 'user_id',
  as: 'auditLogs',
  onDelete: 'SET NULL'
});
AuditLog.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

export {
  sequelize,
  User,
  Trade,
  Wallet,
  Order,
  AuditLog
};