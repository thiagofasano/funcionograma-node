import Cargo from "../models/Cargo";

class Cargos {
  async index(req, res) {
    const cargos = await Cargo.findAll({
      order: [["ordem", "ASC"]]
    });
    return res.json(cargos);
  }

  async show(req, res) {
    const { id } = req.params;
    const cargo = await Cargo.findOne({
      where: {
        id
      }
    });

    res.json([cargo]);
  }

  async updateCargos(req, res) {
    const arrayObj = req.body;

    for (let i = 0; i < arrayObj.length; i += 1) {
      try {
        Cargo.update(
          {
            nome: arrayObj[i].nome,
            ordem: arrayObj[i].ordem
          },
          {
            where: {
              id: arrayObj[i].id
            }
          }
        );
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    return res.status(200).json("ok");
  }

  async update(req, res) {
    const { id } = req.params;
    const { nome, ordem } = req.body;
    const cargo = await Cargo.update(
      {
        nome,
        ordem
      },
      {
        where: {
          id
        }
      }
    );

    res.json(cargo);
  }

  async store(req, res) {
    const { id } = await Cargo.create(req.body);
    res.json(`Cargo cadastrado no id: ${id}`);
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await Cargo.destroy({
        where: {
          id
        }
      });

      res.json(`cargo: ${id}, deletado com sucessso! `);
    } catch (e) {
      res
        .status(500)
        .json(
          `Ocorreu um erro ao tentar deletar! Remova as associações do cargo antes de remove-lo.`
        );
    }
  }
}

export default new Cargos();
