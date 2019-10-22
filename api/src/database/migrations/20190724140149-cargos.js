module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("cargos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ordem: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("cargos");
  }
};
