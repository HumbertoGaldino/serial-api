import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* for github copilot */
/* Episode prisma model (for reference)
model Episode {
  id            Int     @id @default(autoincrement())
  idEpisode     Int
  idTvShow      Int
  season        Int
  episodeNumber Int
  name          String
  runtime       Int
  isNext        Boolean

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  CastTvShow   CastTvShow? @relation(fields: [castTvShowId], references: [id], onDelete: Cascade)
  castTvShowId Int?

  User   User? @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId Int?
}

*/

const episodeController = {
  async createEpisode(req, res) {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const {
      idEpisode,
      idTvShow,
      season,
      episodeNumber,
      name,
      runtime,
      isNext,
      castTvShowId,
    } = req.body;

    const episode = await prisma.episode.create({
      data: {
        idEpisode,
        idTvShow,
        season,
        episodeNumber,
        name,
        runtime,
        isNext,
        castTvShowId,
        userId: parseInt(userId),
      },
    });

    return res.status(201).json(episode);
  },

  async deleteEpisode(req, res) {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const episodeId = req.params.id;

    const episode = await prisma.episode.delete({
      where: {
        id: parseInt(episodeId),
        userId: parseInt(userId),
      },
    });

    return res.status(200).json(episode);
  },

  async getWatchedEpisodes(req, res) {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const episodes = await prisma.episode.findMany({
      where: {
        userId: parseInt(userId),
      },
    });

    return res.status(200).json(episodes);
  },
};

export default episodeController;
