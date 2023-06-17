const dbPool = require('../connection.js');

const createTable = (connection, tableName, tableDefinition) => {
    return new Promise((resolve, reject) => {
        connection.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${tableDefinition})`, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
};

const createTables = (connection) => {
    const tableDefinitions = [
        {
            name: 'guest_profiles',
            definition: `
                id INT AUTO_INCREMENT PRIMARY KEY,
                type VARCHAR(255) NOT NULL,
                username VARCHAR(255) NOT NULL
            `
        },
        {
            name: 'user_profiles',
            definition: `
                id INT AUTO_INCREMENT PRIMARY KEY,
                type VARCHAR(255) NOT NULL,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                avatar VARCHAR(255),
                ownedTrivias TEXT
            `
        }
    ];

    // Select the database
    connection.query('USE credentials', (error) => {
        if (error) {
            throw error;
        }

        const tablePromises = tableDefinitions.map((table) => {
            return createTable(connection, table.name, table.definition);
        });

        Promise.all(tablePromises)
            .then(() => {
                console.log(`${tablePromises.length} table(s) now ready`);
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

    createTables(connection);
});
