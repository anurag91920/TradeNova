import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  orderId: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    field: 'order_id'
  },
  symbol: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  side: {
    type: DataTypes.ENUM('BUY', 'SELL'),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('MARKET', 'LIMIT', 'STOP_LOSS', 'TAKE_PROFIT', 'STOP_LOSS_LIMIT'),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false
  },
  stopPrice: {
    type: DataTypes.DECIMAL(20, 8),
    field: 'stop_price'
  },
  quantity: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false
  },
  executedQty: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0,
    field: 'executed_qty'
  },
  total: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false
  },
  fee: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0
  },
  feeCurrency: {
    type: DataTypes.STRING(10),
    defaultValue: 'USDT',
    field: 'fee_currency'
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'FILLED', 'PARTIALLY_FILLED', 'CANCELLED', 'EXPIRED', 'FAILED'),
    defaultValue: 'PENDING'
  },
  timeInForce: {
    type: DataTypes.ENUM('GTC', 'IOC', 'FOK'),
    defaultValue: 'GTC',
    field: 'time_in_force'
  },
  executedAt: {
    type: DataTypes.DATE,
    field: 'executed_at'
  },
  cancelledAt: {
    type: DataTypes.DATE,
    field: 'cancelled_at'
  },
  notes: {
    type: DataTypes.TEXT
  },
  metadata: {
    type: DataTypes.JSON
  }
}, {
  tableName: 'orders',
  underscored: true,
  timestamps: true,
  indexes: [
    { fields: ['user_id'] },
    { fields: ['symbol'] },
    { fields: ['status'] },
    { fields: ['created_at'] },
    { fields: ['order_id'], unique: true }
  ]
});

export default Order;