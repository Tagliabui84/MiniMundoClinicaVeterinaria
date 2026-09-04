import {Router} from "express";
import { criarAnimal, listarAnimais } from "../controllers/animal.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const animalRoutes = Router();

animalRoutes.post("/animais", authMiddleware, criarAnimal);
animalRoutes.get("/animais", authMiddleware, listarAnimais);

export default animalRoutes;