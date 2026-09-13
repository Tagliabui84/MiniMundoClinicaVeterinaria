import {Router} from "express";
import { criarAnimal, listarAnimais } from "../controllers/animal.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const animalRoutes = Router();

/**
 * @swagger
 * /animais:
 *   post:
 *     summary: Cadastra um novo animal, vinculado a um cliente
 *     tags: [Animais]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoAnimal'
 *     responses:
 *       200:
 *         description: Animal criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       400:
 *         description: Dados inválidos (ex.: clienteId inexistente)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroResposta'
 *       401:
 *         description: Token ausente ou inválido
 */
animalRoutes.post("/", authMiddleware, criarAnimal);

/**
 * @swagger
 * /animais:
 *   get:
 *     summary: Lista todos os animais cadastrados (com o cliente dono)
 *     tags: [Animais]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de animais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Animal'
 *       401:
 *         description: Token ausente ou inválido
 */
animalRoutes.get("/", authMiddleware, listarAnimais);

export default animalRoutes;