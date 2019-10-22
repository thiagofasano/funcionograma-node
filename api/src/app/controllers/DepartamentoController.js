import Departamento from "../models/Departamento";

class Departamentos {
  async store(req, res) {
    const { id } = await Departamento.create(req.body);

    res.json(`Departamento cadastrado no id: ${id}`);
  }

  async index(req, res) {
    const departamentos = await Departamento.findAll();

    return res.json(departamentos);
  }

  async show(req, res) {
    const { id } = req.params;
    const departamento = await Departamento.findOne({
      where: {
        id
      }
    });

    res.json([departamento]);
  }

  async update(req, res) {
    const { id } = req.params;
    const { nome } = req.body;
    const departamento = await Departamento.update(
      {
        nome
      },
      {
        where: {
          id
        }
      }
    );

    res.json(departamento);
  }

  async delete(req, res) {
    const { id } = req.params;
    await Departamento.destroy({
      where: {
        id
      }
    });

    res.json(`departamento: ${id}, deletado com sucessso! `);
  }
}

export default new Departamentos();
