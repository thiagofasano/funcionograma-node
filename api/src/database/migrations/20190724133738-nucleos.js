module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("nucleos", {
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
      departamento_id: {
        type: Sequelize.INTEGER,
        references: { model: "departamentos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("nucleos");
  }
};
