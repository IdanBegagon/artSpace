import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        summary: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const cardModel = mongoose.model("Card", cardSchema);

export default cardModel;