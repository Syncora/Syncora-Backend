class TriviaGame {
    constructor(triviaGameData) {
        this.id = triviaGameData.id;
        this.author = triviaGameData.author;
        this.title = triviaGameData.title;
        this.category = triviaGameData.category;
        this.questions = this.mapQuestions(triviaGameData.questions);
    }

    async save() {

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