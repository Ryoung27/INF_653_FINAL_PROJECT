//Pull in env values.
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
//DB connection.
const connectDB = require('./config/dbConn');
//Port or 3500
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});