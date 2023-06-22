const express = require('express');
const cors = require('cors');
const app = express();

const triviaRoutes = require('./routes/triviaRoutes');
const userRoutes = require('./routes/userRoutes');

const authorizationMiddleware = require('./middleware/authorizationMiddleware');

require('./database/connection.js');
require('./database/setup.js');
require('./database/tables/setup.js');

var corsOptions = {
    origin: '*',
    credentials: true
};
// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/trivia', authorizationMiddleware);

// Routes
app.use('/api/trivia', triviaRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
