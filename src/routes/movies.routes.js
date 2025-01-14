import express from "express";
import movieController from "../controllers/movieController.js";

const router = express.Router();

router.post("/", movieController.createMovie);

router.delete("/:id", movieController.deleteMovie);

export default router;
