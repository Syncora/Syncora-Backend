const dbPool = require('./connection');

// Create the databases
const createDatabases = async () => {
    try {
        await createDatabase('credentials');
        console.log('Database(s) now ready');
    } catch (error) {
        console.error('Error creating databases:', error);
    }
};

// Helper function to create a database
const createDatabase = (databaseName) => {
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

// Run the setup to create databases
createDatabases();
