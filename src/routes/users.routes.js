import express from "express";
import {
  registerUser,
  loginUser,
  listUsers,
} from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * /usuarios/cadastro:
 *   post:
 *     tags:
 *       - User
 *     description: Método para cadastro de usuários
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Dados para criação de novo usuário
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - name
 *             - username
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               example: user@example.com
 *             name:
 *               type: string
 *               example: John
 *             username:
 *               type: string
 *               example: john_doe
 *             password:
 *               type: string
 *               example: mysecurepassword
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Requisição inválida devido a problemas com o nome de usuário ou e-mail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Este nome de usuário já está em uso.
 *       500:
 *         description: Erro no servidor, tente novamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ocorreu um erro inesperado.
 */
router.post("/cadastro", registerUser);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     tags:
 *       - User
 *     description: Método para login de usuário
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Dados para login de usuário
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               example: user@example.com
 *             password:
 *               type: string
 *               example: mysecurepassword
 *     responses:
 *       200:
 *         description: Token gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Senha inválida!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Senha inválida!"
 *       404:
 *         description: Usuário não encontrado!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário não encontrado!"
 *       500:
 *         description: Erro no servidor, tente novamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro no servidor, tente novamente."
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /usuarios/listar:
 *   get:
 *     tags:
 *       - User
 *     description: Lista todos os usuários cadastrados
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *       500:
 *         description: Erro no servidor.
 */
router.get("/listar", listUsers);

export default router;
