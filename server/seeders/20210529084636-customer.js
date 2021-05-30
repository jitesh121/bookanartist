'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Customers', [{
      name: 'Jayson Horadam',
      createdAt:new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Jayson Holder',
      createdAt:new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Customers', null, {});
  }
};
