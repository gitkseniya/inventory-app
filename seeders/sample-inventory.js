'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('items', [
      {
        serial: 'SN0001',
        name: 'Laptop',
        description: 'High-performance laptop',
        quantity: 10,
        created_at: new Date()
      },
      {
        serial: 'SN0002',
        name: 'Keyboard',
        description: 'Mechanical keyboard',
        quantity: 15,
        created_at: new Date()
      },
      {
        serial: 'SN0003',
        name: 'Mouse',
        description: 'Wireless mouse',
        quantity: 20,
        created_at: new Date()
      },
      {
        serial: 'SN0004',
        name: 'Monitor',
        description: '4K UHD Monitor',
        quantity: 5,
        created_at: new Date()
      },
      {
        serial: 'SN0005',
        name: 'Webcam',
        description: 'HD webcam',
        quantity: 8,
        created_at: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('inventory', null, {});
  }
};
