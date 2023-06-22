const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');
const TriviaGame = require('../models/triviaGameModel');

// POST /api/trivia
router.post('/', async (req, res) => {
    /* 
        Create a new trivia game
    */

    const { sub, aud } = req.user;

    if (aud !== 'user') {
        return res.status(403).json({ error: 'Access denied. Guests are not allowed to create a trivia game.' });
    }

    // Generate a unique ID for the trivia game
    const id = uuidv4();

    // Extract the required data from the request body
    const { title, category, questions } = req.body;

    // Create a new instance of the TriviaGame class
    const triviaGame = new TriviaGame({ id, author: sub, title, category, questions });

    // Save the triviaGame instance
    await triviaGame.save();

    res.status(200).send();
});

module.exports = router;
