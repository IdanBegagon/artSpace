const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const MONGODB_URI = 'mongodb+srv://idan4123_db_user:uha43s0cHhIaYtON@artspace.m4zetps.mongodb.net/?appName=artSpace'