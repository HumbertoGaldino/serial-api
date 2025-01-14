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

const userController = {
  async registerUser(req, res) {
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
  },

  async loginUser(req, res) {
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
  },

  async listUsers(req, res) {
    try {
      const users = await prismaPrivate.user.findMany();

      res
        .status(200)
        .json({ message: "Usuários listados com sucesso!", users });
    } catch (error) {
      res.status(500).json({ message: "Erro no servidor!" });
    }
  },

  async getUserProfile(req, res) {
    try {
      const userId = parseInt(req.params.id);

      const limitMovies = 5;
      const limitCastTvShow = 5;
      const limitComments = 5;
      const limitGenres = 5;

      const userProfile = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          movies: {
            take: limitMovies,
          },
          castTvShow: {
            take: limitCastTvShow,
          },
          genres: true,
        },
      });

      if (!userProfile) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      const episodesCount = await prisma.episode.count({
        where: {
          userId: userId,
        },
      });

      userProfile.episodesCount = episodesCount;

      const totalRunTime = await prisma.episode.aggregate({
        _sum: {
          runTime: true,
        },
      });

      const total = totalRunTime._sum.runTime || 0;

      userProfile.totalRunTime = total;

      res.json(userProfile); // Retorna os dados do perfil do usuário
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro no servidor, tente novamente!" });
    }
  },

  async searchUser(req, res) {
    try {
      const searchTerm = req.query.txtBusca;

      if (!searchTerm) {
        return res
          .status(400)
          .json({ message: "Parâmetro de busca é obrigatório" });
      }

      const usersSearched = await prisma.user.findMany({
        where: {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          name: true,
          username: true,
          imgProfile: true,
        },
      });

      res.status(200).json({ usersSearched });
    } catch (error) {
      console.error("Erro ao realizar a busca:", error);
      res.status(500).json({ message: "Erro no servidor. Tente novamente!" });
    }
  },

  async deleteUser(req, res) {
    try {
      const id = parseInt(req.params.id);

      const userId = await prisma.user.findUnique({
        where: { id },
      });

      const deletedUser = await prisma.user.delete({
        where: {
          id: userId.id,
        },
      });

      res.status(204).json({ message: "Usuário deletado." });
    } catch (error) {
      res.status(500).json({ message: "Erro no servidor, tente novamente" });
    }
  },

  async updateUser(req, res) {
    try {
      const id = parseInt(req.params.id);

      const newData = req.body;

      const userId = await prisma.user.findUnique({
        where: { id },
      });

      const updatedUser = await prisma.user.update({
        where: {
          id: userId.id,
        },
        data: newData,
      });

      res.status(200).json({ message: "Usuário atualizado." });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  },
};

export default userController;
