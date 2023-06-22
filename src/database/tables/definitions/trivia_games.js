module.exports = [
  {
    tableName: 'game_data',
    tableDefinition: `
      id INT AUTO_INCREMENT PRIMARY KEY,
      game_id VARCHAR(36) NOT NULL UNIQUE,
      user_id VARCHAR(36) NOT NULL,
      game_title VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      questions JSON NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES credentials.user_profiles(uuid)
    `
  }
];