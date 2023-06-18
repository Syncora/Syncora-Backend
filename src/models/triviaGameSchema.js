const mongoose = require('mongoose');

const triviaGameSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    questions: [
        {
            timeLimit: {
                type: Number,
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            options: [String],
            correctAnswer: {
                type: Number,
                required: true,
            },
        },
    ],
});

const TriviaGame = mongoose.model('TriviaGame', triviaGameSchema);
module.exports = TriviaGame