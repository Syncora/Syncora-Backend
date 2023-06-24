const express = require('express');
const cors = require('cors');
const app = express();

const triviaRoutes = require('./routes/triviaRoutes');
const triviaSessionRoutes = require('./routes/triviaSessionRoutes');
const userRoutes = require('./routes/userRoutes');

const authorizationMiddleware = require('./middleware/authorizationMiddleware');

// Setup connection, databases and tables on MySQL
(async () => {
    await require('./database/connection.js');
    await require('./database/setup.js');
    await require('./database/tables/setup.js');
})();

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
app.use('/api/trivia', triviaSessionRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
