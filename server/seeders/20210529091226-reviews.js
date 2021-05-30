'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Reviews', [{
      rating: 4,
      content: 'Awesome artist',
      artist:1,
      customer:1,
      createdAt:new Date(),
      updatedAt: new Date()
      },
      {
        rating: 3,
        content: 'Good artist',
        artist:1,
        customer:2,
        createdAt:new Date(),
        updatedAt: new Date()
        }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
