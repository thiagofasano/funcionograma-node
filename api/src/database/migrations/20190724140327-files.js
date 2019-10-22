module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("files", {
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
      path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("files");
  }
};
