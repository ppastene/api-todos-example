'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('roles', [{
      id: 1,
      name: 'administrador',
      createdAt: new Date(), updatedAt: new Date()
    },
    {
      id: 2,
      name: 'usuario',
      createdAt: new Date(), updatedAt: new Date()
    }], {});

  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('roles', null, {});

  }
};
