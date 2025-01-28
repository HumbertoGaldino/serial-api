import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const commentController = {
  async createComment(req, res) {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const { idTvShow, idEpisode, season, idMovie, comment } = req.body;

    const comment_db_response = await prisma.comments.create({
      data: {
        idTvShow,
        idEpisode,
        season,
        idMovie,
        comment,
        userId: parseInt(userId),
      },
    });

    if (!comment_db_response) {
      return res.status(400).json({ error: "Erro ao criar comentário" });
    }

    return res.status(201).json(comment_db_response);
  },

  async getComments(req, res) {
    const comments = await prisma.comments.findMany();
    return res.status(200).json(comments);
  },

  async deleteComment(req, res) {
    const userId = req.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const comment_db_response = await prisma.comments.delete({
      where: { id: parseInt(id), userId: parseInt(userId) },
    });

    if (!comment_db_response) {
      return res.status(400).json({ error: "Erro ao deletar comentário" });
    }

    return res.status(200).json(comment_db_response);
  },

  async getMovieComments(req, res) {
    try {
      const { movieId } = req.params;
      const page = parseInt(req.query.page || "1");
      const limit = parseInt(req.query.limit || "10");
      const skip = (page - 1) * limit;

      const [comments, totalComments] = await Promise.all([
        prisma.comments.findMany({
          where: { idMovie: parseInt(movieId) },
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
          include: { User: { select: { id: true, name: true } } },
        }),
        prisma.comments.count({
          where: { idMovie: parseInt(movieId) },
        }),
      ]);

      return res.status(200).json({
        data: comments,
        metadata: {
          currentPage: page,
          totalPages: Math.ceil(totalComments / limit),
          totalComments,
          contentType: "movie",
        },
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getTvShowComments(req, res) {
    try {
      const { showId, seasonNumber, episodeId } = req.params;
      const page = parseInt(req.query.page || "1");
      const limit = parseInt(req.query.limit || "10");
      const skip = (page - 1) * limit;

      const filter = {
        idTvShow: parseInt(showId),
        ...(seasonNumber && { season: parseInt(seasonNumber) }),
        ...(episodeId && { idEpisode: parseInt(episodeId) }),
      };

      const [comments, totalComments] = await Promise.all([
        prisma.comments.findMany({
          where: filter,
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
          include: { User: { select: { id: true, name: true } } },
        }),
        prisma.comments.count({ where: filter }),
      ]);

      return res.status(200).json({
        data: comments,
        metadata: {
          currentPage: page,
          totalPages: Math.ceil(totalComments / limit),
          totalComments,
          contentType: episodeId ? "episode" : seasonNumber ? "season" : "show",
        },
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default commentController;
