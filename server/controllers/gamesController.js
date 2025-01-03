const User = require('../models/userModel');

exports.gameController = {
    async getUserDetails(req, res) {
        const { userId } = req.params;
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const stats = user.games.reduce((sum, game) => {
                if (!sum[game.level]) {
                    sum[game.level] = { totalScore: 0, count: 0 };
                }
                sum[game.level].totalScore += game.score;
                sum[game.level].count++;
                return sum;
            }, {});

            Object.keys(stats).forEach(level => {
                stats[level].averageScore = stats[level].totalScore / stats[level].count;
            });

            res.json({
                userDetails: {
                    username: user.username,
                    profileImage: user.image
                },
                gameHistory: user.games,
                statsByLevel: stats
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    async addGameResult(req, res) {
        const { userId } = req.params;
        const { level, category, score, timeSpent } = req.body;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            user.games.push({
                gameId: `game_${Date.now()}`,
                level,
                category,
                score,
                timeSpent
            });

            await user.save();
            res.status(201).json({ message: "Game result saved successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    async getLeaderboards(req, res) {
        try {
            const users = await User.find();

            const leaderboards = {
                easy: [],
                medium: [],
                hard: []
            };

            users.forEach(user => {
                const statsByLevel = {};
                user.games.forEach(game => {
                    if (!statsByLevel[game.level]) {
                        statsByLevel[game.level] = { correctAnswers: 0, totalQuestions: 0 };
                    }

                    statsByLevel[game.level].correctAnswers += game.score;
                    statsByLevel[game.level].totalQuestions += game.totalQuestions;
                });

                Object.keys(statsByLevel).forEach(level => {
                    const { correctAnswers, totalQuestions } = statsByLevel[level];
                    if (totalQuestions > 0) {
                        const successRate = (correctAnswers / totalQuestions) * 100;
                        leaderboards[level].push({
                            username: user.username,
                            profileImage: user.image,
                            successRate: successRate.toFixed(2)
                        });
                    }
                });
            });
            Object.keys(leaderboards).forEach(level => {
                leaderboards[level].sort((a, b) => b.successRate - a.successRate);
            });

            res.json(leaderboards);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};
