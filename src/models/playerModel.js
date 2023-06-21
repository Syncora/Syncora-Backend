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
};

module.exports = Player;