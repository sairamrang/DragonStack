const express = require('express');
const cors = require ('cors');
const bodyParser = require ('body-parser');
const cookieParser = require ('cookie-parser');
const dragonRouter = require ('../api/dragon');
const accountRouter = require ('../api/account');
const generationsRouter = require ('../api/generations');
const GenerationEngine = require ('./engine.js');


const app = express();
const generationEngine = new GenerationEngine ();

app.locals.generationEngine = generationEngine;

app.use (cors({ origin: 'http://localhost:1234', credentials : true }));
app.use (bodyParser.json());
app.use (cookieParser());

app.use ('/account', accountRouter);
app.use ('/dragon', dragonRouter);
app.use ('/generations', generationsRouter);

app.use ((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        type : 'error',
        message : err.message,
    });
});

generationEngine.start();

module.exports = app;