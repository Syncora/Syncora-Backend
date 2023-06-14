const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const triviaRoutes = require('./routes/triviaRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/trivia', triviaRoutes);
app.use('/api/user', userRoutes);

module.exports = app;