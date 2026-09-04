import { Router } from "express";
import { registrarUsuario, loginUsuario } from "../controllers/usuario.controller";

const router = Router();

router.post("/registrar", registrarUsuario);
router.post("/login", loginUsuario);

export default router;
