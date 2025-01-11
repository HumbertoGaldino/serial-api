import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const prismaPrivate = new PrismaClient({
  omit: {
    user: {
      email: true,
      password: true,
    },
  },
});

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
  try {
    const { email, name, username, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        email,
        name,
        username,
        password: hashPassword,
      },
    });

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    if (error.code === "P2002" && error.meta.target.includes("username")) {
      return res.status(400).json({
        message: "Este nome de usuário já está em uso. Escolha outro.",
      });
    }
    if (error.code === "P2002" && error.meta.target.includes("email")) {
      return res
        .status(400)
        .json({ message: "Este e-mail já foi cadastrado!" });
    }
    res.status(500).json({ message: "Erro no servidor, tente novamente" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Senha inválida!" });
    }

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
};

export const listUsers = async (req, res) => {
  try {
    const users = await prismaPrivate.user.findMany();

    res.status(200).json({ message: "Usuários listados com sucesso!", users });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor!" });
  }
};
