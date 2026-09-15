import{Router} from "express";
import { criarConsulta, listarConsultas } from "../controllers/consulta.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const consultaRoutes = Router();

/**
 * @swagger
 * /consultas:
 *   post:
 *     summary: Agenda uma nova consulta (animal + veterinário)
 *     tags: [Consultas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovaConsulta'
 *     responses:
 *       200:
 *         description: Consulta agendada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consulta'
 *       400:
 *         description: Dados inválidos (exemplo -  animalId/veterinarioId inexistentes)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroResposta'
 *       401:
 *         description: Token ausente ou inválido
 */
consultaRoutes.post("/", authMiddleware, criarConsulta);

/**
 * @swagger
 * /consultas:
 *   get:
 *     summary: Lista todas as consultas (com animal, veterinário e prontuário)
 *     tags: [Consultas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de consultas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Consulta'
 *       401:
 *         description: Token ausente ou inválido
 */
consultaRoutes.get("/", authMiddleware, listarConsultas);

export default consultaRoutes;