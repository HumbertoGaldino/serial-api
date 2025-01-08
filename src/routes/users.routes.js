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
    res.status(500).json({ message: "Erro no servidor, tente novamente" });
  }
});

//Login
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
