import { Router } from "express";
import { criarVeterinario, listarVeterinarios } from "../controllers/veterinario.controller";
import { authMiddleware } from "../middlewares/auth.middleware";  

const veterinarioRoutes = Router();

/**
 * @swagger
 * /veterinarios:
 *   post:
 *     summary: Cria o perfil de veterinário para um usuário já existente
 *     tags: [Veterinários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoVeterinario'
 *     responses:
 *       200:
 *         description: Veterinário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinario'
 *       400:
 *         description: Dados inválidos (ex.: usuarioId ou CRMV/e-mail já usados)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroResposta'
 *       401:
 *         description: Token ausente ou inválido
 */
veterinarioRoutes.post("/", authMiddleware, criarVeterinario);

/**
 * @swagger
 * /veterinarios:
 *   get:
 *     summary: Lista todos os veterinários (com o usuário vinculado)
 *     tags: [Veterinários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de veterinários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Veterinario'
 *       401:
 *         description: Token ausente ou inválido
 */
veterinarioRoutes.get("/", authMiddleware, listarVeterinarios);

export default veterinarioRoutes;