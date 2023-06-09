const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');

const TriviaGame = require('../models/triviaGameModel');
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

    try {
        // Save the triviaGame instance
        await triviaGame.save();

        res.status(201).json({ message: `The trivia game (${triviaGame.id}) has been created successfully.` });
    } catch (error) {
        res.status(500).json({ error: `Failed to create trivia game: ${error.message}.` });
    }
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

    try {
        // Fetch all trivia games associated with the user
        const triviaGames = await TriviaGame.getTriviaGames(sub, options);

        res.status(200).json(triviaGames);
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch trivia games for ${sub}.` });
    }
});


// GET /api/trivia/games/:id
router.get('/games/:id', async (req, res) => {
    /*
      Get a trivia game associated with a game id. This returns everything a tivia game has, including questions. Other endpoints, doesnt do this.
    */

    const game_id = req.params.id;

    try {
        // Fetch trivia game associated with a game id
        const triviaGame = await TriviaGame.getTriviaGame(game_id);

        if (isListEmpty(triviaGame)) {
            return res.status(404).json({ error: `Not Found. Trivia Game (${game_id}) does not exist.` });
        }

        res.status(200).json(triviaGame);
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch trivia game (${game_id}).` });
    }
});

// DELETE /api/trivia/games/:id
router.delete('/games/:id', async (req, res) => {
    /*
      Delete a trivia game associated with a game id.
    */
    const { sub } = req.user;
    const game_id = req.params.id;

    try {
        // Fetch trivia game associated with a game id
        const triviaGame = await TriviaGame.getTriviaGame(game_id);

        // Check if sub is not an author of the trivia game
        if (triviaGame[0].user_id !== sub) {
            return res.status(403).json({ error: 'Access denied. You do not have permission to delete this trivia game. Only the author can delete it.' });
        }

        // Delete trivia game
        await TriviaGame.deleteTriviaGame(game_id);

        res.status(201).json({ message: `The trivia game (${game_id}) deleted successfully.` });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete trivia game (${game_id}).` });
    }
});

module.exports = router;
