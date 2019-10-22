import Sequelize, { Model } from "sequelize";

class Equipe extends Model {
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
    this.belongsTo(models.Nucleo, {
      foreignKey: "nucleo_id",
      as: "nucleo"
    });
  }
}

export default Equipe;
