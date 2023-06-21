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
            throw { statusCode: 500, message: 'Invalid username. Username must be at least 2 characters long.' };
        }
    }

    static async validatePasswordInput(password) {
        if (!password) {
            throw { statusCode: 500, message: 'Invalid password. Password must not be undefined.' };
        }
    }

    static async findByUsername(username) {
        const queryStr = 'SELECT * FROM user_profiles WHERE username = ? LIMIT 1';
        const values = [username];

        try {
            const results = await query(queryStr, values);
            if (results.length === 0) {
                return null; // User not found
            }

            const userData = results[0];
            return new User(userData);

        } catch (error) {
            throw { statusCode: 500, message: 'An error occurred while fetching the user from the database.' };
        }
    }

    async verifyPassword(plainPassword) {
        try {
            const hashKey = process.env.HASH_KEY;
            const stringToBeHashed = plainPassword + hashKey;

            return await bcrypt.compare(stringToBeHashed, this.password);

        } catch (error) {
            throw { statusCode: 500, message: 'An error occurred while verifying the password.' };
        }
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
                throw { statusCode: 409, message: error.sqlMessage };
            } else {
                throw { statusCode: 500, message: error.sqlMessage };
            }
        }
    }
}

module.exports = User;