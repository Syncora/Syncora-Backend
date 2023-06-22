module.exports = [
    {
        tableName: 'guest_profiles',
        tableDefinition: `
            id INT AUTO_INCREMENT PRIMARY KEY,
            uuid VARCHAR(36) NOT NULL UNIQUE,
            type VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL UNIQUE
        `
    },
    {
        tableName: 'user_profiles',
        tableDefinition: `
            id INT AUTO_INCREMENT PRIMARY KEY,
            uuid VARCHAR(36) NOT NULL UNIQUE,
            type VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        `
    }
];