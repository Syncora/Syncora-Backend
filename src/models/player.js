class Player {
    constructor(playerData) {
        /*
        TODO
            - Allow the use of a display name instead of username        
        */ 
        this.id = playerData.id
        this.name = playerData.name
        this.type = playerData.type
        this.host = playerData.host
        
        this.score = 0
    }
    
    /* 
    A player is created from a user when a triviaSession is created
    
    What defines the current game??? Is that a triviaSession? 
    Perhaps call it a triviaGameSession instead?

    The triviaGameSession should dynamically change the number of players
    (not users). Aka players cannot be hardcoded 
    */
    
    
    // The current position in the game (score)
    // Displayname for the current game or the default username
    // Is the player active or not? Perhaps they have disconnected

};

module.exports = Player;