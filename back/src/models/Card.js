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
        summery: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);

export default Card;