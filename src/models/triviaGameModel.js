const { query } = require('../database/utils/postQuery');

class TriviaGame {
    constructor(triviaGameData) {
        this.id = triviaGameData.id;
        this.author = triviaGameData.author;
        this.title = triviaGameData.title;
        this.category = triviaGameData.category;
        this.questions = this.mapQuestions(triviaGameData.questions);
    }

    async save() {
        try {
            const databaseName = process.env.SQL_TRIVIA_GAMES_DB_NAME;
            const queryStr = 'INSERT INTO game_data (game_id, user_id, game_title, category, questions) VALUES (?, ?, ?, ?, ?)';
            const values = [this.id, this.author, this.title, this.category, JSON.stringify(this.questions)];

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