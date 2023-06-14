const mongoose = require('mongoose');

const triviaSessionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'ongoing', 'paused', 'ended'],
        default: 'pending',
    },
    triviaGame: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TriviaGame',
        required: true,
    },
    currentQuestionIndex: {
        type: Number,
        default: 0,
    },
    players: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            score: {
                type: Number,
                default: 0,
            },
            isConnected: {
                type: Boolean,
                default: false,
            },
        },
    ],
    isPublic: {
        type: Boolean,
        default: true,
    },
    inviteCode: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    startedAt: Date,
    endedAt: Date,
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    hostSocket: String,
});

const TriviaSession = mongoose.model('TriviaSession', triviaSessionSchema);
module.exports = TriviaSession