'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Clients', [
      {
        clientName: 'Maria',
        saldo: 300.32,
      },
      {
        clientName: 'Paulo',
        saldo: 1200.15,
      },
      {
        clientName: 'Lucia',
        saldo: 4300.15,
      },
      {
        clientName: 'Jonny',
        saldo: 500.52,
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Clients', null, {});
  }
};
