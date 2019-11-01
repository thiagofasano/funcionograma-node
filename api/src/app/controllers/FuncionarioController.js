import sharp from "sharp";
import path from "path";
import fs from "fs";
import Funcionario from "../models/Funcionario";
import Departamento from "../models/Departamento";
import Nucleo from "../models/Nucleo";
import Equipe from "../models/Equipe";
import Cargo from "../models/Cargo";
import File from "../models/File";

class Funcionarios {
  async index(req, res) {
    const { page = 1 } = req.query;
    let condition = {};

    if (req.query.departamento) {
      condition = { id: req.query.departamento };
    }

    const funcionarios = await Funcionario.findAll({
      attributes: ["id", "nome"],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: File,
          as: "image",
          attributes: ["id", "path"]
        },
        {
          model: Departamento,
          as: "departamento",
          where: condition
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
      ],
      order: [["nome", "ASC"]]
    });
    return res.json(funcionarios);
  }

  async show(req, res) {
    const { id } = req.params;
    const funcionario = await Funcionario.findOne({
      where: {
        id
      },
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
        },
        {
          model: File,
          as: "image",
          attributes: ["id", "path"]
        }
      ]
    });

    res.json([funcionario]);
  }

  async store(req, res) {
    const { nome, departamento_id, nucleo_id, equipe_id, cargo_id } = req.body;
    const { filename: image } = req.file;

    const [name] = image.split(".");
    const fileName = `${name}.jpg`;

    await sharp(req.file.path)
      .resize(150)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, "resized", fileName));

    fs.unlinkSync(req.file.path);

    const foto = await File.create({
      nome,
      path: fileName
    });

    const file_id = foto.id;

    try {
      const funcionario = await Funcionario.create({
        nome,
        file_id,
        cargo_id,
        departamento_id,
        nucleo_id,
        equipe_id
      });

      return res.json(funcionario);
    } catch (err) {
      return console.log(err);
    }
  }

  async delete(req, res) {
    await Funcionario.destroy({
      where: {
        id: req.params.id
      }
    });

    res.json({ server: "Equipe excluída" });
  }

  async update(req, res) {
    const { nome, departamento_id, nucleo_id, equipe_id, cargo_id } = req.body;

    if (req.file) {
      const { filename: image } = req.file;

      const [name] = image.split(".");
      const fileName = `${name}.jpg`;

      await sharp(req.file.path)
        .resize(150)
        .jpeg({ quality: 70 })
        .toFile(path.resolve(req.file.destination, "resized", fileName));

      fs.unlinkSync(req.file.path);

      const foto = await File.create({
        nome,
        path: fileName
      });

      const file_id = foto.id;

      try {
        const funcionario = await Funcionario.update(
          {
            nome,
            file_id,
            cargo_id,
            departamento_id,
            nucleo_id,
            equipe_id
          },
          {
            where: {
              id: req.params.id
            }
          }
        );

        return res.json(funcionario);
      } catch (err) {
        return console.log(err);
      }
    } else {
      try {
        const funcionario = await Funcionario.update(
          {
            nome,
            cargo_id,
            departamento_id,
            nucleo_id,
            equipe_id
          },
          {
            where: {
              id: req.params.id
            }
          }
        );

        return res.json(funcionario);
      } catch (err) {
        return console.log(err);
      }
    }
  }
}

export default new Funcionarios();
