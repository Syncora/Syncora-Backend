class TriviaGame {
    constructor(triviaGameData) {
        this.id = triviaGameData.id
        this.title = triviaGameData.title
        this.category = triviaGameData.category
        this.questions = {
            timeLimit: triviaGameData.timeLimit,
            question: triviaGameData.question,
            options: triviaGameData.options,
            correctAnswer: triviaGameData.correctAnswer
        };
    };
};

module.exports = TriviaGame;