import{Router} from "express";
import { criarConsulta, listarConsultas } from "../controllers/consulta.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const consultaRoutes = Router();

consultaRoutes.post("/consultas", authMiddleware, criarConsulta);
consultaRoutes.get("/consultas", authMiddleware, listarConsultas);

export default consultaRoutes;