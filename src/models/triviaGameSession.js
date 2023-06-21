const Player = require('./player');
const TriviaGame = require('./triviaGame')

class TriviaGameSession {
    constructor(triviaGameSessionData){
        this.id = triviaGameSessionData.id;
        this.status = triviaGameSessionData.status;
        this.gameData = new TriviaGame(triviaGameSessionData.gameData);
        this.currentQuestionIndex = 0;
        this.players = [ new Player(triviaGameSessionData.host) ]; // Initialize with the player who host - Append on the list, when new player connects
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

/*
const playerHost = new Player({ id: '123', name: 'Peter', type: 'user', host: true})

triviaGameSessionData = {
    id: 123,
    status: pending,
    gameData: {},
    host: playerHost,
    minPlayers: 2,
    maxPlayers: 5,
    isPublic: false,
    inviteCode: YH7A2,
    hostSocket: 'ws://'
}

triviaGameSession = new TriviaGameSession(triviaGameSessionData)
*/
