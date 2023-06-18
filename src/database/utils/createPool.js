const mysql = require('mysql');

function createPool(database) {
    return mysql.createPool({
        host: process.env.SQL_HOST,
        user: process.env.SQL_USERNAME,
        password: process.env.SQL_PASSWORD,
        database: database,
    });
}

module.exports = {
    createPool,
};
