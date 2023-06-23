const { query } = require('../database/utils/postQuery');

class TriviaGame {
    constructor(triviaGameData) {
        this.id = triviaGameData.id;
        this.author = triviaGameData.author;
        this.title = triviaGameData.title;
        this.category = triviaGameData.category;
        this.questions = this.mapQuestions(triviaGameData.questions);
    }

    static async getTriviaGames(userId, options) {
        const { ownedGames, limit } = options;
        const databaseName = process.env.SQL_TRIVIA_GAMES_DB_NAME;
        let queryStr = 'SELECT game_id, user_id, created_at, game_title, category, JSON_LENGTH(questions) AS num_questions FROM game_data';
        let values = [];

        if (ownedGames) {
            queryStr += ' WHERE user_id = ?';
            values.push(userId);
        }

        if (limit) {
            queryStr += ' LIMIT ?';
            values.push(limit);
        }

        try {
            const results = await query(databaseName, queryStr, values);
            return results;
        } catch (error) {
            throw { statusCode: 500, message: 'Failed to retrieve trivia games.' };
        }
    }

    static async getTriviaGame(game_id) {
        const databaseName = process.env.SQL_TRIVIA_GAMES_DB_NAME;
        const queryStr = 'SELECT * from game_data WHERE game_id = ? LIMIT 1';
        const values = [game_id];

        try {
            const result = await query(databaseName, queryStr, values);
            return result;
        } catch (error) {
            throw { statusCode: 500, message: 'Failed to retrieve trivia game details.' };
        }
    }

    async save() {
        const databaseName = process.env.SQL_TRIVIA_GAMES_DB_NAME;
        const queryStr = 'INSERT INTO game_data (game_id, user_id, game_title, category, questions) VALUES (?, ?, ?, ?, ?)';
        const values = [this.id, this.author, this.title, this.category, JSON.stringify(this.questions)];

        try {
            await query(databaseName, queryStr, values);

            console.log('Trivia game saved successfully');
        } catch (error) {
            throw { statusCode: 500, message: 'Failed to save trivia game.' };
        }
    }

    mapQuestions(questions) {
        return questions.map(({ id, timeLimit, question, options, correctAnswer }) => ({
            id,
            timeLimit,
            question,
            options,
            correctAnswer
        }));
    };

}

module.exports = TriviaGame;