import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const tvShowController = {
  async createTvShow(req, res) {
    try {
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const {
        idTvShow,
        originalName,
        overview,
        posterPath,
        firstAirDate,
        isFavorite,
        genres,
      } = req.body;

      const tvshow = await prisma.castTvShow.create({
        data: {
          idTvShow,
          originalName,
          overview,
          posterPath,
          firstAirDate,
          isFavorite,
          genres: {
            create: {
              name: genres.name,
              idGenre: genres.id,
            },
          },
          userId: parseInt(userId),
        },
      });
      res.status(201).json(tvshow);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar série" });
    }
  },

  async deleteTvShow(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const tvshow = await prisma.castTvShow.delete({
        where: {
          id: parseInt(id),
          userId: parseInt(userId),
        },
      });
      res.status(200).json(tvshow);
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar série" });
    }
  },
};

export default tvShowController;
