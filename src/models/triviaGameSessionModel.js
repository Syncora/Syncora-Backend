const Player = require('./playerModel');
const TriviaGame = require('./triviaGameModel')

class TriviaGameSession {
    constructor(triviaGameSessionData) {
        this.id = triviaGameSessionData.id;
        this.status = triviaGameSessionData.status;
        this.gameData = new TriviaGame(triviaGameSessionData.gameData);
        this.currentQuestionIndex = null;
        this.players = [new Player(triviaGameSessionData.host)]; // Initialize with the player who host - Append on the list, when new player connects
        this.minPlayers = triviaGameSessionData.minPlayers;
        this.maxPlayers = triviaGameSessionData.maxPlayers;
        this.isPublic = triviaGameSessionData.isPublic;
        this.inviteCode = triviaGameSessionData.inviteCode;
        this.hostSocket = triviaGameSessionData.hostSocket;
        this.createdAt = new Date();
        this.endedAt = null;
    };
};

module.exports = TriviaGameSession;