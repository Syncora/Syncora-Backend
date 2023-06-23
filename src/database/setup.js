const dbPool = require('./connection');

// Create the databases
const createDatabases = async () => {
    try {
        await createDatabase('credentials');
        await createDatabase('trivia_games');
    } catch (error) {

        if (error.code == 'ECONNREFUSED') {
            console.error('Error: Failed to connect to the MySQL database. Please ensure that the MySQL server is running and accessible.');
            return;
        }
        console.error('Error creating databases:', error);
    }
};

// Helper function to create a database
const createDatabase = async (databaseName) => {
    return new Promise((resolve, reject) => {
        dbPool.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

// Wrap the code in an async function and invoke it
(async () => {
    await createDatabases();
})();
