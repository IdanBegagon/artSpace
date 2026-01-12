import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { connectDB } from "./db/connectDB.js";
//route imports
import cardsRoutes from "./routes/cardsRoutes.js"
import authRouter from "./routes/authRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB();

//middleware
app.use(cors());
app.use(express.json());

//endpoints
app.use("/api/auth", authRouter)
app.use("/api/cards", cardsRoutes);

app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
});

