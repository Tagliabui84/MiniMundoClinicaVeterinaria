import { Router } from "express";
import { criarCliente, listarClientes } from "../controllers/cliente.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const clienteRoutes = Router();

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cadastra um novo cliente (dono de animal)
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoCliente'
 *     responses:
 *       200:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Dados inválidos ou CPF/e-mail já cadastrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroResposta'
 *       401:
 *         description: Token ausente ou inválido
 */
clienteRoutes.post("/", authMiddleware, criarCliente);

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista todos os clientes cadastrados (com seus animais)
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *       401:
 *         description: Token ausente ou inválido
 */
clienteRoutes.get("/", authMiddleware, listarClientes);

export default clienteRoutes;
