export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('trades', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      symbol: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('BUY', 'SELL'),
        allowNull: false
      },
      order_type: {
        type: Sequelize.ENUM('MARKET', 'LIMIT', 'STOP_LOSS', 'TAKE_PROFIT'),
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(20, 8),
        allowNull: false
      },
      quantity: {
        type: Sequelize.DECIMAL(20, 8),
        allowNull: false
      },
      total: {
        type: Sequelize.DECIMAL(20, 8),
        allowNull: false
      },
      fee: {
        type: Sequelize.DECIMAL(20, 8),
        defaultValue: 0
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'FILLED', 'PARTIALLY_FILLED', 'CANCELLED', 'FAILED'),
        defaultValue: 'PENDING'
      },
      executed_at: {
        type: Sequelize.DATE
      },
      notes: {
        type: Sequelize.TEXT
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    // Add indexes for performance
    await queryInterface.addIndex('trades', ['user_id']);
    await queryInterface.addIndex('trades', ['symbol']);
    await queryInterface.addIndex('trades', ['status']);
    await queryInterface.addIndex('trades', ['created_at']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('trades');
  }
};