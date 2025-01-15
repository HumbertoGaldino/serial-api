import express from "express";
import connectionController from "../controllers/connectionController.js";

const router = express.Router();

router.post("/:id", connectionController.follow);
router.delete("/:id", connectionController.unfollow);
router.get("/followers", connectionController.getFollowers);
router.get("/following", connectionController.getFollowing);
router.get("/:id/isFollower", connectionController.isFollower);

export default router;
