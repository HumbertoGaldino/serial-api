import express from "express";
import commentController from "../controllers/commentController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, commentController.createComment);
router.delete("/:id", auth, commentController.deleteComment);
router.get("/", commentController.getComments);
router.get("/movies/:movieId", commentController.getMovieComments);
router.get("/tvshows/:showId", commentController.getTvShowComments);
router.get("/tvshows/:showId/season/:seasonNumber", commentController.getTvShowComments);
router.get("/tvshows/:showId/season/:seasonNumber/episode/:episodeId", commentController.getTvShowComments);

export default router;
