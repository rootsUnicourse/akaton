const { Router } = require('express');
const { authController } = require('../controllers/authController.js');
const authRouter = new Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

module.exports = authRouter;