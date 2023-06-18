const { query } = require('../database/utils/postQuery');

class User {
    constructor(userData) {
        this.uuid = userData.uuid;
        this.type = userData.type;
        this.username = userData.username;
        this.password = userData.password;
    }

    async register() {
        const queryStr = 'INSERT INTO user_profiles (uuid, type, username, password) VALUES (?, ?, ?, ?)';
        const values = [this.uuid, this.type, this.username, this.password];

        try {
            await query(queryStr, values);
            console.log('User registered successfully');
            return;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw { statusCode: 409, message: 'The provided username is already in use.' };
            } else {
                throw { statusCode: 500, message: 'An error occurred while registering the user.' };
            }
        }
    }
}

module.exports = User;