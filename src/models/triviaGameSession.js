const Player = require('./player');
const TriviaGame = require('./triviaGame')
const { v4: uuidv4 } = require('uuid');
const { nanoid } = require("nanoid");

class TriviaGameSession {
    constructor(sessionId, minPlayers, maxPlayers, isPublic, inviteCode) {
        this.id = sessionId;
        this.status = 'pending';
        this.gameSchema = null;
        this.minPlayers = minPlayers;
        this.maxPlayers = maxPlayers;
        this.players = [];
        this.isPublic = isPublic;
        this.inviteCode = inviteCode;
        this.createdAt = new Date();
        this.endedAt = null;
    }

    async addPlayer(player) {
        this.players.push(player);
    }

    async setGameSchema(gameSchema) {
        this.gameSchema = gameSchema;
    }

    static async generateSessionID() {
        return uuidv4();
    }

    static async generateInviteCode() {
        return nanoid(5);
    }
};

module.exports = TriviaGameSession;