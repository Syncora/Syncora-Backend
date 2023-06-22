const dbPool = require('../connection');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

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

const createTables = (connection, databaseName, tableDefinitions) => {
    // Select the database
    connection.query(`USE ${databaseName}`, (error) => {
        if (error) {
            throw error;
        }

        const tablePromises = tableDefinitions.map(({ name, definition }) => {
            return createTable(connection, databaseName, name, definition);
        });

        Promise.all(tablePromises)
            .then(() => {
                connection.release();
            })
            .catch((error) => {
                console.error('Error creating tables:', error);
                connection.release();
            });
    });
};

// Get a connection from the pool
dbPool.getConnection((error, connection) => {
    if (error) {
        console.error('Error getting database connection:', error);
        process.exit(1); // Exit the process with a non-zero status code
    }

    const databases = [
        {
            name: process.env.SQL_CREDENTIALS_DB_NAME,
            tableDefinitions: getTableDefinitions(process.env.SQL_CREDENTIALS_DB_NAME)
        }
    ];

    databases.forEach(({ name, tableDefinitions }) => {
        createTables(connection, name, tableDefinitions);
    });
});

function getTableDefinitions(databaseName) {
    const definitionFilePath = path.join(__dirname, 'definitions', `${databaseName}.js`);
    const tableDefinitions = require(definitionFilePath);
    return tableDefinitions;
}