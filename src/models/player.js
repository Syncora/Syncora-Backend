class Player {
    constructor(id, name, type, host) {
        /*
        TODO
            - Allow the use of a display name instead of username        
        */
        this.id = id;
        this.name = name;
        this.type = type;
        this.host = host;

        this.score = 0
    }
};

module.exports = Player;