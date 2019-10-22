import Funcionario from "../models/Funcionario";
import Departamento from "../models/Departamento";
import Nucleo from "../models/Nucleo";
import Equipe from "../models/Equipe";
import Cargo from "../models/Cargo";

class Funcionogramas {
  async index(req, res) {
    const funcionario = await Funcionario.findAll({
      where: {
        departamento_id: req.params.departamento
      },
      attributes: ["id", "nome"],
      include: [
        {
          model: Departamento,
          as: "departamento"
        },
        {
          model: Nucleo,
          as: "nucleo",
          attributes: ["id", "nome", "atividades", "ordem"]
        },
        {
          model: Equipe,
          as: "equipe",
          attributes: ["id", "nome", "atividades", "ordem"]
        },
        {
          model: Cargo,
          as: "cargo",
          attributes: ["id", "nome", "ordem"]
        }
      ]
    });

    return res.json(funcionario);
  }
}

export default new Funcionogramas();
