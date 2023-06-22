const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');
const TriviaGame = require('../models/triviaGameModel');

// POST /api/trivia
router.post('/', async (req, res) => {
    /* 
        Create a new trivia game
    */

    const { sub, name, aud } = req.user;

    if (aud !== 'user') {
        return res.status(403).json({ error: 'Access denied. Guests are not allowed to create a trivia game.' });
    }

    // Generate a unqiue ID for the trivia game
    const id = uuidv4();

    // Extract the required data from the request body
    const { title, category, questions } = req.body;

    // Create an array of question objects using map
    const triviaQuestions = questions.map(({ id, timeLimit, question, options, correctAnswer }) => ({
        id,
        timeLimit,
        question,
        options,
        correctAnswer
    }));

    // Create a new instance of the TriviaGame class
    const triviaGame = new TriviaGame({
        id,
        author: sub,
        title,
        category,
        questions: triviaQuestions
    });

    // Use the created triviaGame instance as needed
    console.log(triviaGame);

    res.status(200).send();
})

module.exports = router;