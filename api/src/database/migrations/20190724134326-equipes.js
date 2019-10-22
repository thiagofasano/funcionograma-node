module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("equipes", {
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
      atividades: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ordem: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      nucleo_id: {
        type: Sequelize.INTEGER,
        references: { model: "nucleos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("equipes");
  }
};
