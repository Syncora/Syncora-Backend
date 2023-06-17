const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: 'credentials',
});

class User {
    constructor(data) {
        this.data = data;
    }

    register() {
        return new Promise((resolve, reject) => {
            const user = this.data;
            console.log(user)

            const query = `INSERT INTO user_profiles (uuid, type, username, password)
                           VALUES (?, ?, ?, ?)`;

            const values = [
                user.uuid,
                user.type,
                user.username,
                user.password
            ];

            pool.query(query, values, (error, results) => {
                if (error && error.code === 'ER_DUP_ENTRY') {
                    reject({ statusCode: 409, message: 'The provided username is already in use.' });
                    return;
                }

                console.log('User registered successfully');
                resolve('User registered successfully');
            });
        });
    }
}

module.exports = User;