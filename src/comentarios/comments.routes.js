import { Router } from "express";
import { check } from "express-validator";
import {
    commentPost,
    commentPut,
    commentDelete
} from "./comments.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check("publicationId", "ID isn't a valid MongoDB format").isMongoId(),
        check("title", "Title is required").not().isEmpty(),
        check("comments", "Content is required").not().isEmpty(),
        validarCampos,
    ], commentPost
);


router.put(
    "/:id",
    [
        validarJWT,
        check("title", "Title is required").not().isEmpty(),
        check("comments", "Content is required").not().isEmpty(),
        validarCampos,
    ], commentPut
);

router.delete(
    "/:id",
    [
        validarJWT,
        validarCampos,
    ], commentDelete
);

export default router;