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
    }
}, {timestamps: true});

const storyModel = mongoose.model('story', storySchema);

export default storyModel;