import jwt from "jsonwebtoken";
import storyModel from "../models/storyModel.js";

export const createStory = async (req, res) => {
    try {
        const { title, content, summary } = req.body;

        //im using let because in line 18 i change this variable
        let newStory = new storyModel({
            title,
            content,
            summary,
            author: req.userId
        });

        await newStory.save();
        //I populate this to be able to present the new story imidietly on the user's profile
        newStory = await newStory.populate('author', 'userName');
        //I added newStory to the response to be able to use newStory._id in the frontend immidiately 
        res.json({ success: true, message: "story created successfully", newStory })
    } catch (error) {
        res.json({ error: error.message });
    }
};

export const getAllStories = async (req, res) => {
    try {
        //.populate placing the actucal user name from the user schema instead of the user id (like join and select of sql)
        const stories = (await storyModel.find().populate('author', 'userName').sort({ createdAt: -1}));
        res.json(stories);
    } catch (error) {
        res.json({ error: error.message });
    }
}

export const getUserStories = async (req, res) => {
    try {
        const stories = await storyModel.find({ author: req.userId }).populate('author', 'userName');
        res.json({ success: true, message: "successfully got user's stories", stories });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
}

export const getStoryById = async (req, res) => {
    try {
        const story = await storyModel.findById(req.params.id).populate('author', 'userName');
        res.json(story);
    } catch (error) {
        res.json({ error: error.message });
    }
}

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) return res.json({ message: "Missing token" });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        //next is to get out of this function and execute the next function (createStory in this case) 
        next();
    } catch (error) {
        res.json(error);
    }

}

export const deleteStory = async (req, res) => {
    try {
        const deletedStory = await storyModel.findByIdAndDelete(req.params.id);

        if (!deletedStory) return res.status(404).json({ message: "Story not found" });
        res.json({ success: true, message: "Story deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

export const editStory = async (req, res) => {
    try {
        const { title, content, summary } = req.body;
        //check if the author of the story is the one trying to edit
        const story = await storyModel.findById(req.params.id);
        if (story.author.toString() !== req.userId) {
            return res.json({ succss: false, message: "You're not allowed to edit this story!" });
        }

        const editStory = await storyModel.findByIdAndUpdate(req.params.id, { title, content, summary }, { new: true }).populate('author', 'userName');
        if (!editStory) return res.status(404).json({ success: false, message: "Story not found" });

        res.json({ success: true, editStory });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
};

export const toggleFavorite = async (req, res) => {
    try {
        const story = await storyModel.findById(req.params.id);
        const userId = req.userId;

        if (story.favorites.includes(userId)) {
            //if the user id is already exist on the favorite array that means the user clicked again the favorite button to remove from favorite (so i filter it out)
            story.favorites = story.favorites.filter(id => id.toString() !== userId);
        } else {
            story.favorites.push(userId);
        }

        await story.save();
        res.json({ success: true, favorites: story.favorites });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
};

export const getFavoriteStories = async (req, res) => {
    try {
        const stories = await storyModel.find({ favorites: req.userId }).populate('author', 'userName');
        res.json({ success: true, stories });
    } catch (error) {
        res.json({success: false, error: error.message});
    }
};