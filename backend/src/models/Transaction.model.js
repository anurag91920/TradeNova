import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

const Transaction = class extends Model {};

Transaction.init(
  {
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

    type: {
      type: DataTypes.ENUM('DEPOSIT', 'WITHDRAWAL', 'TRANSFER'),
      allowNull: false
    },

    amount: {
      type: DataTypes.DECIMAL(20, 8),
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED'),
      defaultValue: 'PENDING'
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },

    updatedAt: {
      type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'updated_at'
    }
  },
  {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
    timestamps: true,
    underscored: true
  }
);

export default Transaction;