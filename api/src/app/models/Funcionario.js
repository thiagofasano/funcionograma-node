import Sequelize, { Model } from "sequelize";

class Funcionario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING
      },
      {
        sequelize
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: "file_id",
      as: "image",
      allowNull: true
    });

    this.belongsTo(models.Cargo, {
      foreignKey: "cargo_id",
      as: "cargo"
    });

    this.belongsTo(models.Departamento, {
      foreignKey: "departamento_id",
      as: "departamento"
    });

    this.belongsTo(models.Nucleo, {
      foreignKey: "nucleo_id",
      as: "nucleo"
    });

    this.belongsTo(models.Equipe, {
      foreignKey: "equipe_id",
      as: "equipe"
    });
  }
}

export default Funcionario;
