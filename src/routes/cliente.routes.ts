import { Router } from "express";
import { criarCliente, listarClientes } from "../controllers/cliente.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const clienteRoutes = Router();

clienteRoutes.post("/", authMiddleware, criarCliente);
clienteRoutes.get("/", authMiddleware, listarClientes);

export default clienteRoutes;
