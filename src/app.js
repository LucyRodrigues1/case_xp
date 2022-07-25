const express = require('express');
const httpErroMiddleware = require('./middlewares/httpErroMiddleware');
const routes = require('./routers');

const app = express();

app.use(express.json());
app.use(httpErroMiddleware);
app.use(routes);

module.exports = app;