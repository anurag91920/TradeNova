import bcrypt from 'bcrypt';

export default {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash('Password@123', 10);

    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@tradenova.com',
        password,
        username: 'admin',
        full_name: 'TradeNova Admin',
        role: 'admin',
        is_active: true,
        two_factor_enabled: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'user@tradenova.com',
        password,
        username: 'trader',
        full_name: 'Demo Trader',
        role: 'user',
        is_active: true,
        two_factor_enabled: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', {
      email: {
        [Sequelize.Op.in]: [
          'admin@tradenova.com',
          'user@tradenova.com'
        ]
      }
    });
  }
};