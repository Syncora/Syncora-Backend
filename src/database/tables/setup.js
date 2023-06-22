const dbPool = require('../connection');
const fs = require('fs');
const path = require('path');

const createTable = (connection, databaseName, tableName, tableDefinition) => {
    return new Promise((resolve, reject) => {
        connection.query(`CREATE TABLE IF NOT EXISTS ${databaseName}.${tableName} (${tableDefinition})`, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
};

const createTables = async (connection, databases) => {
    for (const { name, tableDefinitions } of databases) {
        try {
            await connection.query(`USE ${name}`);

            for (const { tableName, tableDefinition } of tableDefinitions) {
                await createTable(connection, name, tableName, tableDefinition);
            }
        } catch (error) {
            console.error('Error creating tables:', error);
            connection.release();
        }
    }
};

const databases = [
    {
        name: process.env.SQL_CREDENTIALS_DB_NAME,
        tableDefinitions: getTableDefinitions(process.env.SQL_CREDENTIALS_DB_NAME),
    },
    {
        name: process.env.SQL_TRIVIA_GAMES_DB_NAME,
        tableDefinitions: getTableDefinitions(process.env.SQL_TRIVIA_GAMES_DB_NAME),
    },
];

// Get a connection from the pool
dbPool.getConnection((error, connection) => {
    if (error) {
        console.error('Error getting database connection:', error);
        process.exit(1); // Exit the process with a non-zero status code
    }

    createTables(connection, databases);
});

function getTableDefinitions(databaseName) {
    const definitionFilePath = path.join(__dirname, 'definitions', `${databaseName}.js`);
    return require(definitionFilePath);
}
