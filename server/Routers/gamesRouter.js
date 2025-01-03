const { Router } = require('express');
const { gameController } = require('../controllers/gamesController');
const gameRouter = new Router();

gameRouter.get('/user/:userId', gameController.getUserDetails);
gameRouter.get('/leaderboard', gameController.getLeaderboards);
gameRouter.post('/user/:userId/game', gameController.addGameResult);

module.exports = gameRouter;