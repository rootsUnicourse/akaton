const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    gameId: { type: String, required: true },
    score: { type: Number, required: true },
    averageTimePerQuestion: { type: Number, required: true },
    level: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
    date: { type: Date, default: Date.now },
    totalQuestions: { type: Number, default: 10 },
    timeSpent: { type: Number, default: 0 },
    category: { type: String, required: true }
});

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] },
    username: { type: String, required: true, minlength: [3, 'Username must be at least 3 characters'], },
    password: { type: String, required: true, minlength: [8, 'Password must be at least 8 characters'] },
    image: { type: String, required: true },
    games: [gameSchema]
}, { collection: 'users' });

const User = model('User', userSchema);

module.exports = User;