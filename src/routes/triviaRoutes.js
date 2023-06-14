const express = require('express');
const router = express.Router();
const TriviaGame = require('../models/triviaGameSchema');

// POST /api/trivia
router.get('/', async (req, res) => {
    res.status(200).send();
})

module.exports = router;