import { Router } from "express";
import { check } from "express-validator";
import {
    usuariosGet,
    getUsuarioById,
} from "./user.controller.js";
import {
    existeEmail,
    existeUsuarioById,
} from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get(
    "/:id",
    [
      check("id", "It is not a valid ID").isMongoId(),
      check("id").custom(existeUsuarioById),
      validarCampos,
    ],
    getUsuarioById
  );