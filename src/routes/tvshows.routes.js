import express from "express";
import tvShowController from "../controllers/tvshowController.js";

const router = express.Router();

router.post("/", tvShowController.createTvShow);
router.delete("/:id", tvShowController.deleteTvShow);

export default router;
