import { Router } from "express";
import { criarProntuario, listarProntuarios } from "../controllers/prontuario.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, criarProntuario);
router.get("/", authMiddleware, listarProntuarios);

export default router;
