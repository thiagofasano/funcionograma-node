import sharp from "sharp";
import path from "path";
import fs from "fs";
import File from "../models/File";

class Files {
  async store(req, res) {
    const { nome } = req.body;
    const { filename: image } = req.file;

    const [name] = image.split(".");
    const fileName = `${name}.jpg`;

    await sharp(req.file.path)
      .resize(150)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, "resized", fileName));

    fs.unlinkSync(req.file.path);

    const upload = await File.create({
      nome,
      path: fileName
    });

    res.json(upload);
  }
}

export default new Files();
