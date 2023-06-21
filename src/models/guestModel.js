const { query } = require('../database/utils/postQuery');

class Guest {
    constructor(guestData) {
        this.uuid = guestData.uuid;
        this.type = guestData.type;
        this.username = guestData.username;
    }

    async register() {
        const queryStr = 'INSERT INTO guest_profiles (uuid, type, username) VALUES (?, ?, ?)';
        const values = [this.uuid, this.type, this.username];

        try {
            await query(queryStr, values);
            console.log('Guest registered successfully');
            return;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw { statusCode: 409, message: error.sqlMessage };
            } else {
                throw { statusCode: 500, message: error.sqlMessage };
            }
        }
    }
}

module.exports = Guest;