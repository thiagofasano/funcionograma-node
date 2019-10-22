module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("funcionarios", {
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
      file_id: {
        type: Sequelize.INTEGER,
        references: { model: "files", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true
      },
      cargo_id: {
        type: Sequelize.INTEGER,
        references: { model: "cargos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true
      },
      departamento_id: {
        type: Sequelize.INTEGER,
        references: { model: "departamentos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true
      },
      nucleo_id: {
        type: Sequelize.INTEGER,
        references: { model: "nucleos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true
      },
      equipe_id: {
        type: Sequelize.INTEGER,
        references: { model: "equipes", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("funcionarios");
  }
};
