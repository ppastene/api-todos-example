'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('todo_statuses', [
      {
        id: 1,
        title: "Assigned",
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: 2,
        title: "In process",
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: 3,
        title: "Completed",
        createdAt: new Date(), updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('todo_statuses', null, {});
  }
};
