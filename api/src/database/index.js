import Sequelize from "sequelize";
import configDb from "../config/db";

import Departamento from "../app/models/Departamento";
import Nucleo from "../app/models/Nucleo";
import Equipe from "../app/models/Equipe";
import Funcionario from "../app/models/Funcionario";
import Cargo from "../app/models/Cargo";
import File from "../app/models/File";

const models = [Departamento, Nucleo, Equipe, Funcionario, Cargo, File];

class Database {
  constructor() {
    this.init();
  }

  async init() {
    this.connection = new Sequelize(configDb);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
