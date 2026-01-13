import express from "express";
import {
    createStory,
    getAllStories,
    getUserStories,
    getStoryById,
    verifyToken
} from "../controllers/storyController.js";

const router = express.Router();

router.post('/createStory', verifyToken, createStory);
router.get('/getAllStories', getAllStories);
router.get('/getUserStories', verifyToken, getUserStories);
router.get('/getStoryById/:id', getStoryById);
router.post('/verifyToken', verifyToken);

export default router;