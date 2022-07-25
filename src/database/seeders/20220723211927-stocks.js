'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Stocks', [
      {
        code: 'AZULl4',
        companyName: 'Azul',
        price: 10.00,
        amount: 214,
      },
      {
        code: 'PETR4',
        companyName: 'Petrobras',
        price: 12.00,
        amount: 120,
      },
      {
        code: 'VALE4',
        companyName: 'Vale do Rio Doce',
        price: 24.00,
        amount: 512,
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stocks', null, {});
  }
};
