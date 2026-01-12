import express from "express";
import {
    createStory,
    getAllStories,
    verifyToken
} from "../controllers/storyController.js";

const router = express.Router();

router.post('/createStory', verifyToken, createStory);
router.get('/getAllStories/:id', getAllStories)
router.post('/verifyToken', verifyToken);

export default router;