const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']},
    username: { type: String, required: true, minlength: [3, 'Username must be at least 3 characters'],},
    password: { type: String, required: true, minlength: [8, 'Password must be at least 8 characters']},
    image: { type: String, required: true}
}, { collection:'users'});

const User = model('User', userSchema);

module.exports = User;