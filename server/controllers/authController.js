const User = require('../models/userModel');

exports.authController = {
    async register(req, res) {
        try {
            const { email, username, password, image } = req.body;

            if (!username || !password || !email || !image) {
                return res.status(400).json({ error: "All fields are required!" });
            }

            const emailRegex = /^\S+@\S+\.\S+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ field: 'email', error: "Invalid email format." });
            }

            const existingUser = await User.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                const field = existingUser.email === email ? 'email' : 'username';
                return res.status(400).json({ error: `This ${field} is already registered. ` });
            }

            const newUser = new User({
                email,
                username,
                password,
                image
            });

            await newUser.save();

            res.status(200).json({
                message: 'User registered successfully',
                user: {
                    email: newUser.email,
                    username: newUser.username,
                    birthDate: newUser.image
                }
            });
        } catch (error) {
            res.status(500).json({
                error: "An error occurred while register user",
                details: error.message
            });
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "Email and password are required!" });
            }

            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Invalid email or password!" });
            }

            if (user.password !== password) {
                return res.status(400).json({ error: "Invalid username or password!"});
            }

            res.status(200).json({
                message: "Login successful",
                user: {
                    username: user.username,
                    email: user.email,
                },
            });
        } catch (error) {
            res.status(500).json({
                error: "An error occurred while login user",
                details: error.message
            });
        }
    }
};