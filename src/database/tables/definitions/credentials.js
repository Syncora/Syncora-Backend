module.exports = [
    {
        name: 'guest_profiles',
        definition: `
            id INT AUTO_INCREMENT PRIMARY KEY,
            uuid VARCHAR(36) NOT NULL,
            type VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL UNIQUE
        `
    },
    {
        name: 'user_profiles',
        definition: `
            id INT AUTO_INCREMENT PRIMARY KEY,
            uuid VARCHAR(36) NOT NULL,
            type VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            avatar VARCHAR(255),
            ownedTrivias TEXT
        `
    }
];