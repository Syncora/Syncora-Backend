const mysql = require('mysql');
const { createPool } = require('./createPool');

function query(databaseName, query, values) {
    const pool = createPool(databaseName);

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
