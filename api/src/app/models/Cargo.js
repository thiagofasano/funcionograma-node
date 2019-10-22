import Sequelize, { Model } from "sequelize";

class Cargo extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        ordem: Sequelize.INTEGER
      },
      {
        sequelize
      }
    );
    return this;
  }
}

export default Cargo;
