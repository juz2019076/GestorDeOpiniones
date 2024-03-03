import { Router } from "express";
import { check } from "express-validator";
import {
    usuariosPost,
    getUsuarioById,
    usuariosPut,
} from "./user.controller.js";
import {
    existeEmail,
    existeUsuarioById,
} from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
  "/",
  [
    check("name", "The name is required").not().isEmpty(),
    check("password", "The password must be greater than 6 characters").isLength({
      min: 6,
    }),
    check("email", "This is not a valid email").isEmail(),
    check("email").custom(existeEmail),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "Not a valid ID").isMongoId(),
    check("id").custom(existeUsuarioById),
    check("email", "Email is mandatory").isEmail(),
    check("email").custom(existeEmail),
    validarCampos,
  ],
  usuariosPut
);

export default router;