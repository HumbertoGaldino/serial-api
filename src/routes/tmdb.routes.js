import express from "express";
import tmdbController from "../controllers/tmdbController.js";

const router = express.Router();

router.get("/discover/movies/:page", tmdbController.discoverMovies);
router.get("/discover/tv/:page", tmdbController.discoverTvShows);
router.get("/search/:page/:query", tmdbController.search);
router.get("/tv/:id", tmdbController.getTvShow);
router.get("/tv/:id/season/:season", tmdbController.getSeason);
router.get(
  "/tv/:id/season/:season/episode/:episode",
  tmdbController.getEpisode
);
router.get("/movie/:id", tmdbController.getMovie);
router.get("/movie/:id/trailer", tmdbController.getMovieTrailer);
router.get("/tv/:id/trailer", tmdbController.getSeasonTrailer);

export default router;
