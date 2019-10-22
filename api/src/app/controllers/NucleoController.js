import Nucleo from "../models/Nucleo";
import Departamento from "../models/Departamento";

class Nucleos {
  async index(req, res) {
    let condition = {};

    if (req.query.departamento) {
      condition = { id: req.query.departamento };
    }

    const nucleos = await Nucleo.findAll({
      attributes: ["id", "nome", "atividades", "ordem"],
      include: [
        {
          model: Departamento,
          as: "departamento",
          where: condition
        }
      ],

      order: [["ordem", "ASC"]]
    });

    return res.json(nucleos);
  }

  async show(req, res) {
    const { id } = req.params;
    const nucleo = await Nucleo.findOne({
      where: {
        id
      },
      include: [
        {
          model: Departamento,
          as: "departamento"
        }
      ]
    });

    res.json(nucleo);
  }

  async update(req, res) {
    const { id } = req.params;
    const { nome, atividades, departamento_id } = req.body;
    const nucleo = await Nucleo.update(
      {
        nome,
        atividades,
        departamento_id
      },
      {
        where: {
          id
        }
      }
    );

    res.json(nucleo);
  }

  async store(req, res) {
    const nucleo = await Nucleo.create(req.body);
    res.json(nucleo);
  }

  async delete(req, res) {
    const existNucleo = await Nucleo.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!existNucleo) {
      res.json(`Núcleo não existe!`);
    }

    await Nucleo.destroy({
      where: {
        id: req.params.id
      }
    });

    res.json({ server: "nucleo excluído" });
  }
}

export default new Nucleos();
