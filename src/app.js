const express = require('express');
const cors = require('cors');
const app = express();

require('./database/connection.js');
require('./database/setup.js');
require('./database/tables/setup.js');

var corsOptions = {
    origin: '*',
    credentials: true
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const triviaRoutes = require('./routes/triviaRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/trivia', triviaRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
