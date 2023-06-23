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
            throw new Error(`Failed to retrieve trivia games for user: ${error.message}`);
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
            throw new Error(`Failed to save trivia game: ${error.message}`);
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