const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: 'credentials',
});

class Guest {
    constructor(data) {
        this.data = data;
    }

    register() {
        return new Promise((resolve, reject) => {
            const guest = this.data;

            const query = `INSERT INTO guest_profiles (uuid, type, username)
                           VALUES (?, ?, ?)`;

            const values = [
                guest.uuid,
                guest.type,
                guest.username,
            ];

            pool.query(query, values, (error, results) => {
                if (error && error.code === 'ER_DUP_ENTRY') {
                    reject({ statusCode: 409, message: 'The provided username is already in use.' });
                    return;
                }

                console.log('Guest registered successfully');
                resolve('Guest registered successfully');
            });
        });
    }
}

module.exports = Guest;