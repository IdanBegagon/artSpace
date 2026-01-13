import jwt from "jsonwebtoken";
import storyModel from "../models/storyModel.js";

export const createStory = async (req, res) => {
    try {
        const { title, content, summary } = req.body;

        const newStory = new storyModel({
            title,
            content,
            summary,
            author: req.userId
        });

        await newStory.save();
        //I added newStory to the response to be able to use newStory._id in the frontend immidiately 
        res.json({ success: true, message: "story created successfully", newStory })
    } catch (error) {
        res.json({ error: error.message });
    }
};

export const getAllStories = async (req, res) => {
    try {
        //.populate placing the actucal user name from the user schema instead of the user id (like join and select of sql)
        const stories = await storyModel.find().populate('author', 'userName');
        res.json(stories);
    } catch (error) {
        res.json({ error: error.message });
    }
}

export const getUserStories = async (req, res) => {
    try {
        const stories = await storyModel.find({ author: req.userId }).populate('author', 'userName');
        res.json({success: true, message: "successfully got user's stories", stories});
    } catch (error) {
        res.json({success: false, error: error.message});
    }
}

export const getStoryById = async (req, res) => {
    try {
        const story = await storyModel.findById(req.params.id).populate('author', 'userName');
        res.json(story);
    } catch (error) {
        res.json({error: error.message});
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