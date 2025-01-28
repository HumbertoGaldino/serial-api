import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const connectionController = {
  async follow(req, res) {
    try {
      const userFollowId = req.userId;
      const userFollowedId = req.params.id;

      const follow = await prisma.connections.create({
        data: {
          idUserFollow: parseInt(userFollowId),
          idUserFollowed: parseInt(userFollowedId),
        },
      });

      return res.status(201).json(follow);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor!" });
    }
  },

  async unfollow(req, res) {
    try {
      const userFollowId = req.userId;
      const userFollowedId = req.params.id;

      const isConnection = await prisma.connections.findUnique({
        where: {
          idUserFollow_idUserFollowed: {
            idUserFollow: parseInt(userFollowId),
            idUserFollowed: parseInt(userFollowedId),
          },
        },
      });

      if (isConnection) {
        const unfollow = await prisma.connections.delete({
          where: {
            idUserFollow_idUserFollowed: {
              idUserFollow: parseInt(userFollowId),
              idUserFollowed: parseInt(userFollowedId),
            },
          },
        });

        return res
          .status(200)
          .json({ message: "Deixou de seguir com sucesso!", unfollow });
      }

      return res.status(404).json({ message: "Você não segue esse usuário!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor!" });
    }
  },

  async isFollower(req, res) {
    try {
      const userFollowId = req.userId;
      const userFollowedId = req.params.id;

      const isConnection = await prisma.connections.findUnique({
        where: {
          idUserFollow_idUserFollowed: {
            idUserFollow: parseInt(userFollowId),
            idUserFollowed: parseInt(userFollowedId),
          },
        },
      });

      if (!isConnection) {
        return res.status(404).json({ message: false });
      }

      return res.status(200).json({ message: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro no servidor!" });
    }
  },

  async getFollowers(req, res) {
    try {
      const userFollowedID = req.userId;
      const followers = await prisma.connections.findMany({
        where: {
          idUserFollowed: parseInt(userFollowedID),
        },
      });

      res
        .status(200)
        .json({ message: "Seguidores listados com sucesso!", followers });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor!" });
    }
  },

  async getFollowing(req, res) {
    try {
      const userFollowingID = req.userId;

      const following = await prisma.connections.findMany({
        where: {
          idUserFollow: parseInt(userFollowingID),
        },
      });

      res
        .status(200)
        .json({ message: "Seguindo listados com sucesso!", following });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor!" });
    }
  },
};

export default connectionController;
