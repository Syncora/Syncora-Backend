const dbPool = require('./connection');

// Create the databases
const createDatabases = async () => {
    try {
        await createDatabase('credentials');
        await createDatabase('trivia_games');
    } catch (error) {
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
