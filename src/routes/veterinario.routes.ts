import { Router } from "express";
import { criarVeterinario, listarVeterinarios } from "../controllers/veterinario.controller";
import { authMiddleware } from "../middlewares/auth.middleware";  

const veterinarioRoutes = Router();

veterinarioRoutes.post("/veterinarios", authMiddleware, criarVeterinario);
veterinarioRoutes.get("/veterinarios", authMiddleware, listarVeterinarios);

export default veterinarioRoutes;