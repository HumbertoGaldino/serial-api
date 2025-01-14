import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const movieController = {
  async createMovie(req, res) {
    try {
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const {
        idMovie,
        originalName,
        overview,
        posterPath,
        firstAirDate,
        isFavorite,
        genres,
      } = req.body;

      const movie = await prisma.movie.create({
        data: {
          idMovie,
          originalName,
          overview,
          posterPath,
          firstAirDate,
          isFavorite,
          userId: parseInt(userId),
          genres: {
            create: {
              name: genres.name,
              idGenre: genres.id,
            },
          },
        },
      });
      res.status(201).json(movie);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar filme" });
    }
  },

  async deleteMovie(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const movie = await prisma.movie.deleteMany({
        where: {
          id: parseInt(id),
          userId: parseInt(userId),
        },
      });

      if (movie.count === 0) {
        return res.status(404).json({ error: "Filme não encontrado" });
      }

      res.json({ message: "Filme deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar filme" });
    }
  },
};

export default movieController;
