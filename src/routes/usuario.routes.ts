import { Router } from "express";
import { registrarUsuario, loginUsuario } from "../controllers/usuario.controller";

const router = Router();

/**
 * @swagger
 * /usuarios/registrar:
 *   post:
 *     summary: Registra um novo usuário (recepcionista ou veterinário)
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoUsuario'
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso (sem o hash da senha na resposta)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Dados inválidos ou e-mail já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroResposta'
 */
router.post("/registrar", registrarUsuario);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResposta'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroResposta'
 *       401:
 *         description: Senha inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroResposta'
 */
router.post("/login", loginUsuario);

export default router;
