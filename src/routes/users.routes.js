import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * /users/cadastro:
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
router.post("/register", userController.validateJWTToken);

/**
 * @swagger
 * /users/login:
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
router.post("/login", userController.loginUser);

/**
 * @swagger
 * /user/validate:
 *   post:
 *     tags:
 *       - User
 *     description: Validação de usuário
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Usuário validado com sucesso
 *       401:
 *         description: Token inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token inválido!"
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
router.post("/validate", userController.validateUser);

/**
 * @swagger
 * /users/listar:
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
router.get("/list", userController.listUsers);

/**
 * @swagger
 * /users/perfil/{id}:
 *   get:
 *     tags:
 *       - User
 *     description: Retorna o perfil completo de um usuário específico
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário cujo perfil será retornado
 *     responses:
 *       200:
 *         description: Perfil do usuário retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: Informações básicas do usuário
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     username:
 *                       type: string
 *                     imgProfile:
 *                       type: string
 *                     imgBackground:
 *                       type: string
 *                 followers:
 *                   type: integer
 *                   description: Número de seguidores do usuário
 *                 following:
 *                   type: integer
 *                   description: Número de pessoas que o usuário está seguindo
 *                 timekeeper:
 *                   type: object
 *                   description: Tempo total gasto em episódios assistidos
 *                   properties:
 *                     timeMonths:
 *                       type: integer
 *                     timeDays:
 *                       type: integer
 *                     timeHours:
 *                       type: integer
 *                     timeMinutes:
 *                       type: integer
 *                 episodes:
 *                   type: integer
 *                   description: Número total de episódios assistidos
 *                 favoritesCast:
 *                   type: array
 *                   description: Lista de séries favoritas
 *                   items:
 *                     type: object
 *                     properties:
 *                       idTvShow:
 *                         type: integer
 *                       originalName:
 *                         type: string
 *                       overview:
 *                         type: string
 *                 cast:
 *                   type: array
 *                   description: Lista de séries assistidas pelo usuário
 *                   items:
 *                     type: object
 *                     properties:
 *                       idTvShow:
 *                         type: integer
 *                       originalName:
 *                         type: string
 *                       overview:
 *                         type: string
 *                 genres:
 *                   type: array
 *                   description: Gêneros favoritos do usuário
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get("/profile/:id", userController.getUserProfile);

/**
 * @swagger
 * /users/search:
 *   get:
 *     tags:
 *       - User
 *     description: Busca usuários pelo nome ou parte do nome
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: txtBusca
 *         required: true
 *         schema:
 *           type: string
 *         description: Termo de busca para encontrar usuários pelo nome
 *     responses:
 *       200:
 *         description: Lista de usuários encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   description: Lista de usuários encontrados
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID do usuário
 *                       name:
 *                         type: string
 *                         description: Nome do usuário
 *                       username:
 *                         type: string
 *                         description: Nome de usuário (username)
 *                       imgProfile:
 *                         type: string
 *                         nullable: true
 *                         description: URL da imagem de perfil do usuário
 *       400:
 *         description: Parâmetro de busca é obrigatório
 *       500:
 *         description: Erro no servidor
 */
router.get("/search", userController.searchUser);

router.delete("/:id", userController.deleteUser);

router.patch("/:id", userController.updateUser);

export default router;
