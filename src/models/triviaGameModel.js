class TriviaGame {
    constructor(triviaGameData) {
        this.id = triviaGameData.id
        this.author = triviaGameData.author
        this.title = triviaGameData.title
        this.category = triviaGameData.category
        this.questions = triviaGameData.questions.map((questionData) => ({
            timeLimit: questionData.timeLimit,
            question: questionData.question,
            options: questionData.options,
            correctAnswer: questionData.correctAnswer,
        }));
    };
};

module.exports = TriviaGame;