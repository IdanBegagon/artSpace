import express from "express";
import {
    createStory,
    getAllStories,
    getUserStories,
    getStoryById,
    deleteStory,
    editStory,
    toggleFavorite,
    getFavoriteStories,
    verifyToken
} from "../controllers/storyController.js";

const router = express.Router();

router.post('/createStory', verifyToken, createStory);
router.get('/getAllStories', getAllStories);
router.get('/getUserStories', verifyToken, getUserStories);
router.get('/getStoryById/:id', getStoryById);
router.delete('/deleteStory/:id', verifyToken, deleteStory);
router.put('/editStory/:id', verifyToken, editStory);
router.post('/toggleFavorite/:id', verifyToken, toggleFavorite);
router.get('/getFavoriteStories', verifyToken, getFavoriteStories);
router.post('/verifyToken', verifyToken);

export default router;