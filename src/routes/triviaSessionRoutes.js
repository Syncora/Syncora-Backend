const express = require('express');
const router = express.Router();

const TriviaGame = require('../models/triviaGame');
const TriviaGameSession = require('../models/triviaGameSession');
const User = require('../models/user');
const Player = require('../models/player');
const { isBooleanString, isValidInteger, isListEmpty } = require('../utils/validationHelper');

// POST /api/trivia/:id/start?minPlayers=2&maxPlayers=4&isPublic=true
router.post('/:id/start', async (req, res) => {
    const { sub } = req.user;
    const { minPlayers, maxPlayers, isPublic } = req.query;
    const gameId = req.params.id;

    if (!isBooleanString(isPublic) || !isValidInteger(minPlayers) || !isValidInteger(maxPlayers)) {
        return res.status(400).json({ error: 'Invalid query type parameters.' });
    }

    const sessionId = await TriviaGameSession.generateSessionID();
    const inviteCode = isPublic === 'false' ? await TriviaGameSession.generateInviteCode() : '';

    const triviaGameSession = new TriviaGameSession(sessionId, minPlayers, maxPlayers, isPublic, inviteCode);

    try {

        // Set the game schema
        const gameSchema = await TriviaGame.getTriviaGame(gameId);
        triviaGameSession.setGameSchema(gameSchema);

        // Add host to players on the trivia game session
        const user = await User.findByUUID(sub);
        const player = new Player(sub, user.username, user.type, true)

        // Add the host to the session
        triviaGameSession.addPlayer(player);

        res.status(200).send()
    } catch (error) {
        res.status(500).json({ error: 'Failed to start the game session.' });
    }
});

module.exports = router;