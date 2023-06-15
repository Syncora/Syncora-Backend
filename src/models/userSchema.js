const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    avatar: {
        type: String,
        default: 'def',
    },
    ownedTrivias: [mongoose.Schema.Types.ObjectId],
});

const User = mongoose.model('User', userSchema);
module.exports = User;