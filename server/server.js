const express = require('express');
const app = express();
const logger = require('morgan');
const port = process.env.PORT || 8080;

const authRouter = require('./routers/authRouter.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger("dev"));

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.use('/api/auth', authRouter);

app.use((req, res) => {
    res.status(404).send("Page wasn't found");
});

app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});