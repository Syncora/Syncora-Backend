const { query } = require('../database/utils/postQuery');
const bcrypt = require('bcrypt');

class User {
    constructor(userData) {
        this.uuid = userData.uuid;
        this.type = userData.type;
        this.username = userData.username;
        this.password = userData.password;
    }

    static async validateUsernameInput(username) {
        if (!username || username.length < 2) {
            return false;
        }

        return true;
    }

    static async validatePasswordInput(password) {
        if (!password) {
            return false;
        }

        return true;
    }

    static async findByUsername(username) {
        const databaseName = process.env.SQL_CREDENTIALS_DB_NAME;
        const queryStr = 'SELECT * FROM user_profiles WHERE username = ? LIMIT 1';
        const values = [username];

        try {
            const results = await query(databaseName, queryStr, values);
            if (results.length === 0) {
                return null; // User not found
            }

            const userData = results[0];
            return new User(userData);

        } catch (error) {
            return false;
        }
    }

    static async findByUUID(uuid) {
        const databaseName = process.env.SQL_CREDENTIALS_DB_NAME;
        const queryStr = 'SELECT * FROM user_profiles WHERE uuid = ? LIMIT 1';
        const values = [uuid];

        try {
            const results = await query(databaseName, queryStr, values);
            if (results.length === 0) {
                return null; // User not found
            }

            const userData = results[0];
            return new User(userData);

        } catch (error) {
            return false;
        }
    }

    async verifyPassword(plainPassword) {
        try {
            const hashKey = process.env.HASH_KEY;
            const stringToBeHashed = plainPassword + hashKey;

            return await bcrypt.compare(stringToBeHashed, this.password);

        } catch (error) {
            return false;
        }
    }

    async register() {
        const databaseName = process.env.SQL_CREDENTIALS_DB_NAME;
        const queryStr = 'INSERT INTO user_profiles (uuid, type, username, password) VALUES (?, ?, ?, ?)';
        const values = [this.uuid, this.type, this.username, this.password];

        try {
            await query(databaseName, queryStr, values);

            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = User;