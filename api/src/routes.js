import { Router } from "express";
import multer from "multer";
import DepartamentoController from "./app/controllers/DepartamentoController";
import NucleoController from "./app/controllers/NucleoController";
import EquipeController from "./app/controllers/EquipeController";
import FuncionarioController from "./app/controllers/FuncionarioController";
import FileController from "./app/controllers/FileController";
import FuncionogramaController from "./app/controllers/FuncionogramaController";
import CargoController from "./app/controllers/CargoController";

import uploadConfig from "./config/upload";

const upload = multer(uploadConfig);

const routes = new Router();

// Departamentos
routes.post("/departamentos", DepartamentoController.store);
routes.get("/departamentos", DepartamentoController.index);
routes.get("/departamentos/:id", DepartamentoController.show);
routes.put("/departamentos/:id", DepartamentoController.update);
routes.delete("/departamentos/:id", DepartamentoController.delete);

// Núcleos
routes.post("/nucleos", NucleoController.store);
routes.get("/nucleos", NucleoController.index);
routes.get("/nucleos/:id", NucleoController.show);
routes.put("/nucleos/:id", NucleoController.update);
routes.delete("/nucleos/:id", NucleoController.delete);

// Equipes
routes.post("/equipes", EquipeController.store);
routes.get("/equipes", EquipeController.index);
routes.get("/equipes/:id", EquipeController.show);
routes.put("/equipes/:id", EquipeController.update);
routes.delete("/equipes/:id", EquipeController.delete);

// Funcionarios
routes.post(
  "/funcionarios",
  upload.single("image"),
  FuncionarioController.store
);
routes.get("/funcionarios", FuncionarioController.index);
routes.get("/funcionarios/:id", FuncionarioController.show);
routes.put(
  "/funcionarios/:id",
  upload.single("image"),
  FuncionarioController.update
);
routes.delete("/funcionarios/:id", FuncionarioController.delete);

// Files
routes.post("/files", upload.single("image"), FileController.store);
// routes.get("/files", FileController.index);
// routes.get("/files", FileController.show);
// routes.update("/files/:id", FileController.update);
// routes.delete("/files/:id", FileController.delete);

// Cargos
routes.post("/cargos", CargoController.store);
routes.get("/cargos", CargoController.index);
routes.get("/cargos/:id", CargoController.show);
routes.put("/cargos/:id", CargoController.update);
routes.put("/cargos/", CargoController.updateCargos);
routes.delete("/cargos/:id", CargoController.delete);

// Funcionograma
routes.get("/funcionograma/:departamento", FuncionogramaController.index);

export default routes;
