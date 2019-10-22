import Equipe from "../models/Equipe";
import Nucleo from "../models/Nucleo";
import Departamento from "../models/Departamento";

class Equipes {
  async index(req, res) {
    let condition = {};

    if (req.query.nucleo) {
      condition = { id: req.query.nucleo };
    }

    const equipes = await Equipe.findAll({
      attributes: ["id", "nome", "atividades", "ordem"],
      include: {
        model: Nucleo,
        as: "nucleo",
        where: condition,
        attributes: ["id", "nome", "atividades", "ordem"],
        include: {
          model: Departamento,
          as: "departamento"
        }
      },
      order: [["ordem", "ASC"]]
    });

    return res.json(equipes);
  }

  async store(req, res) {
    // const existNucleo = await Nucleo.findOne({
    //   where: {
    //     id: req.body.nucleo_id
    //   }
    // });

    // if (!existNucleo) {
    //   return res.json(`Nucleo não existe`);
    // }

    const equipe = await Equipe.create(req.body);
    return res.json(equipe);
  }

  async show(req, res) {
    const { id } = req.params;
    const equipe = await Equipe.findOne({
      where: {
        id
      },
      include: [
        {
          model: Nucleo,
          as: "nucleo"
        }
      ]
    });

    res.json(equipe);
  }

  async update(req, res) {
    const { id } = req.params;
    const { nome, atividades, nucleo } = req.body;
    const equipe = await Equipe.update(
      {
        nome,
        atividades,
        nucleo
      },
      {
        where: {
          id
        }
      }
    );

    res.json(equipe);
  }

  async delete(req, res) {
    const existEquipe = await Equipe.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!existEquipe) {
      res.json(`Equipe não existe!`);
    }

    await Equipe.destroy({
      where: {
        id: req.params.id
      }
    });

    res.json({ server: "Equipe excluída" });
  }
}

export default new Equipes();
