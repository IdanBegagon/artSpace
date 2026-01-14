import Card from "../models/cardModel.js"

export const getAllCards = async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createCard = async (req, res) => {
    try {
        const { title, author, summary } = req.body;
        const card = new Card({ title, author, summary });

        await card.save()
        res.status(201).json({ message: "Note created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCard = async (req, res) => {
    try {
        const { title, author, summary } = req.body;
        const updatedCard = await Card.findByIdAndUpdate(req.params.id, { title, author, summary });

        if (!updatedCard) return res.status(404).json({ message: "Card not found" });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteCard = async (req, res) => {
    try {
        const deletedCard = await Card.findByIdAndDelete(req.params.id);

        if (!deletedCard) return res.status(404).json({ message: "Story not found" });
        res.json({ success: true, message: "Story deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};