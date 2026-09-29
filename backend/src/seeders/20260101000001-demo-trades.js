export default {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      `SELECT id, email FROM users WHERE email IN ('admin@tradenova.com', 'user@tradenova.com')`,
      {
        type: Sequelize.QueryTypes.SELECT
      }
    );

    const admin = users.find(
      user => user.email === 'admin@tradenova.com'
    );

    const trader = users.find(
      user => user.email === 'user@tradenova.com'
    );

    if (!admin || !trader) {
      throw new Error('Demo users not found. Run demo-users seeder first.');
    }

    await queryInterface.bulkInsert('trades', [
      {
        user_id: trader.id,
        symbol: 'BTCUSDT',
        type: 'BUY',
        order_type: 'MARKET',
        price: 60000.00000000,
        quantity: 0.01000000,
        total: 600.00000000,
        fee: 0.60000000,
        status: 'FILLED',
        executed_at: new Date(),
        notes: 'Demo BTC purchase',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: trader.id,
        symbol: 'ETHUSDT',
        type: 'BUY',
        order_type: 'LIMIT',
        price: 3000.00000000,
        quantity: 0.10000000,
        total: 300.00000000,
        fee: 0.30000000,
        status: 'FILLED',
        executed_at: new Date(),
        notes: 'Demo ETH purchase',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: trader.id,
        symbol: 'BTCUSDT',
        type: 'SELL',
        order_type: 'LIMIT',
        price: 65000.00000000,
        quantity: 0.00500000,
        total: 325.00000000,
        fee: 0.32500000,
        status: 'PENDING',
        executed_at: null,
        notes: 'Demo BTC sell order',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: admin.id,
        symbol: 'ETHUSDT',
        type: 'BUY',
        order_type: 'MARKET',
        price: 3000.00000000,
        quantity: 0.05000000,
        total: 150.00000000,
        fee: 0.15000000,
        status: 'FILLED',
        executed_at: new Date(),
        notes: 'Admin demo trade',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('trades', null, {});
  }
};