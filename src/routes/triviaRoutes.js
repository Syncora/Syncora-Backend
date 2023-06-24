const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');

const TriviaGame = require('../models/triviaGame');
const { isBooleanString, isValidInteger, isListEmpty } = require('../utils/validationHelper');

// POST /api/trivia/game
router.post('/game', async (req, res) => {
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
    const saved = await triviaGame.save();
    if (!saved) {
        return res.status(500).json({ message: `Failed to save trivia game (${triviaGame.id}). ` });
    }

    res.status(201).json({ message: `The trivia game (${triviaGame.id}) has been created successfully.` });
});

// GET /api/trivia/games?ownedGames=false&limit=20
router.get('/games', async (req, res) => {
    /*
      Get all trivia games associated with the user
    */
    const { sub } = req.user;
    const { ownedGames, limit } = req.query;

    if (!isBooleanString(ownedGames) || !isValidInteger(limit)) {
        return res.status(400).json({ error: 'Invalid query type parameters.' });
    }

    const options = {
        ownedGames,
        limit: parseInt(limit) || null
    }

    // Fetch all trivia games associated with the user
    const triviaGames = await TriviaGame.getTriviaGames(sub, options);
    if (!triviaGames) {
        return res.status(500).json({ error: `Failed to retrieve trivia games.` });
    }

    res.status(200).json(triviaGames);
});


// GET /api/trivia/games/:id
router.get('/games/:id', async (req, res) => {
    /*
      Get a trivia game associated with a game id. This returns everything a tivia game has, including questions. Other endpoints, doesnt do this.
    */

    const gameId = req.params.id;

    // Fetch trivia game associated with a game id
    const triviaGame = await TriviaGame.getTriviaGame(gameId);
    if (!triviaGame) {
        return res.status(500).json({ error: `Failed to retrieve trivia game (${gameId}).` });
    }

    if (isListEmpty(triviaGame)) {
        return res.status(404).json({ error: `Not Found. Trivia Game (${gameId}) does not exist.` });
    }

    res.status(200).json(triviaGame);
});

// DELETE /api/trivia/games/:id
router.delete('/games/:id', async (req, res) => {
    /*
      Delete a trivia game associated with a game id.
    */
    const { sub } = req.user;
    const gameId = req.params.id;

    // Fetch trivia game associated with a game id
    const triviaGame = await TriviaGame.getTriviaGame(gameId);
    if (!triviaGame) {
        return res.status(500).json({ error: `Failed to retrieve trivia game (${gameId}).` });
    }

    // Check if sub is not an author of the trivia game
    if (triviaGame[0].user_id !== sub) {
        return res.status(403).json({ error: 'Access denied. You do not have permission to delete this trivia game. Only the author can delete it.' });
    }

    // Delete trivia game
    const deleted = await TriviaGame.deleteTriviaGame(gameId);
    if (!deleted) {
        return res.status(500).json({ error: `Failed to delete trivia game (${gameId}).` });
    }

    res.status(201).json({ message: `The trivia game (${gameId}) deleted successfully.` });
});

module.exports = router;
