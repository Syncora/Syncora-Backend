const mysql = require('mysql');
const { createPool } = require('./createPool');

// Create a connection pool for the 'credentials' database
const pool = createPool('credentials');

function query(query, values) {
    return new Promise((resolve, reject) => {
        pool.query(query, values, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

module.exports = {
    query,
};
