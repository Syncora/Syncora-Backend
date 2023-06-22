const mysql = require('mysql');

// Check if required environment variables are provided
if (!process.env.SQL_CONNECTION_LIMIT || !process.env.SQL_HOST || !process.env.SQL_USERNAME || !process.env.SQL_PASSWORD) {
    throw new Error('Missing required environment variables for database connection');
}

// Create a connection pool for reusing connections
const pool = mysql.createPool({
    connectionLimit: process.env.SQL_CONNECTION_LIMIT,
    host: process.env.SQL_HOST,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
});

module.exports = pool;