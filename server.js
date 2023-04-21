//Pull in env values.
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const mongoose = require('mongoose');
//DB connection.
const connectDB = require('./config/dbConn');
//Port or 3500
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

//Apply CORS
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

//built-in middlware
app.use(express.urlencoded({ extended: false}));

//built-in middleware for json
app.use(express.json());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));

//This is the default if it doesn't hit any of the above.
//* means all, so it'll catch anything that isn't above.
app.all('*', (req, res) => {
    //Chaining status 404 to send a 404 instead of 200.
    res.status(404);
    if( req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if ( req.accepts('json')){
        res.json({err: '404 Not Found'});
    } else{
        res.type('txt').send('404 Not Found');
    }
    
})

//Test connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});