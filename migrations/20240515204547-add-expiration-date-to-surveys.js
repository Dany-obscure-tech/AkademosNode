module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('surveys', 'expirationDate', {
      type: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('surveys', 'expirationDate');
  }
};