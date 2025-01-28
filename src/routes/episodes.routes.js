import express from "express";
import episodeController from "../controllers/episodeController.js";

const router = express.Router();

router.post("/", episodeController.createEpisode);
router.get("/watched", episodeController.getWatchedEpisodes);
router.delete("/:id", episodeController.deleteEpisode);

export default router;
