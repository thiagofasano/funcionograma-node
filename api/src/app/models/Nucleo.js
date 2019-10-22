import Sequelize, { Model } from "sequelize";

class Nucleo extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        atividades: Sequelize.STRING,
        ordem: Sequelize.INTEGER
      },
      {
        sequelize
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Departamento, {
      foreignKey: "departamento_id",
      as: "departamento"
    });
  }
}

export default Nucleo;
