const { query } = require('../database/utils/postQuery');

class Guest {
    constructor(guestData) {
        this.id = guestData.id;
        this.type = guestData.type;
        this.username = guestData.username;
    }

    async register() {
        const databaseName = process.env.SQL_CREDENTIALS_DB_NAME;
        const queryStr = 'INSERT INTO guest_profiles (id, type, username) VALUES (?, ?, ?)';
        const values = [this.id, this.type, this.username];

        try {
            await query(databaseName, queryStr, values);

            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = Guest;