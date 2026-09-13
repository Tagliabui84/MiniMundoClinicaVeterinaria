import { Router } from "express";
import { criarProntuario, listarProntuarios } from "../controllers/prontuario.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * /prontuarios:
 *   post:
 *     summary: Registra o prontuário (diagnóstico/prescrição) de uma consulta
 *     tags: [Prontuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoProntuario'
 *     responses:
 *       200:
 *         description: Prontuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prontuario'
 *       400:
 *         description: Dados inválidos (ex.: consultaId inexistente ou já possui prontuário)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroResposta'
 *       401:
 *         description: Token ausente ou inválido
 */
router.post("/", authMiddleware, criarProntuario);

/**
 * @swagger
 * /prontuarios:
 *   get:
 *     summary: Lista todos os prontuários (com a respectiva consulta)
 *     tags: [Prontuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de prontuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prontuario'
 *       401:
 *         description: Token ausente ou inválido
 */
router.get("/", authMiddleware, listarProntuarios);

export default router;
