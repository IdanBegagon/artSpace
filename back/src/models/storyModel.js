import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    summary:{
        type: String,
        required: true
    },
    author:{
        //connect story to user's id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    //making this an array to save multiple users on 1 story
    favorites:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
}, {timestamps: true});

const storyModel = mongoose.model('story', storySchema);

export default storyModel;