import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import auth from "../middlewares/auth.js";

const prismaPrivate = new PrismaClient({
  omit: {
    user: {
      email: true,
      password: true,
    },
  },
});

const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

//Cadastro

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
router.post("/cadastro", async (req, res) => {
  try {
    const { email, name, username, password } = req.body;

    const salt = await bcrypt.genSalt(10); //Quão forte será a encriptação
    const hashPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        email: email,
        name: name,
        username: username,
        password: hashPassword,
      },
    });

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    if (error.code === "P2002" && error.meta.target.includes("username")) {
      res.status(400).json({
        message: "Este nome de usuário já está em uso. Escolha outro.",
      });
    }
    if (error.code === "P2002" && error.meta.target.includes("email")) {
      res.status(400).json({ message: "Este e-mail já foi cadastrado!" });
    }
    res.status(500).json({ message: "Erro no servidor, tente novamente" });
  }
});

//Login

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     tags:
 *       - User
 *     description: Login de usuário
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

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //Busca o usuário no BD
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    //Verifica se o usuário existe no BD
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    //Compara as senhas
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Senha inválida!" });
    }

    //Gerar token JWT
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        username: user.username,
        imgProfile: user.imgProfile,
        imgBackground: user.imgBackground,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor, tente novamente" });
  }
});

//Listar usuários
router.get("/listar", async (req, res) => {
  try {
    const users = await prismaPrivate.user.findMany();

    res.status(200).json({ message: "Usuários listado com sucesso!", users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor!" });
  }
});

export default router;
