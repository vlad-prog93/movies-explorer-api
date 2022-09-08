const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { errors } = require('celebrate');
const helmet = require('helmet');

// middlewares
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimit');

// routes
const routes = require('./routes/index');

// utils
const ApiErrors = require('./utils/apiErrors');
const { PAGE_NOT_FOUND, MONGO_URL_AND_PORT } = require('./utils/const');

const app = express();

const start = async () => {
  try {
    mongoose.connect(`mongodb://${MONGO_URL_AND_PORT}`, {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(limiter);
    app.use(requestLogger);
    app.use(routes);
    app.use((req, res, next) => next(ApiErrors.NotFound(PAGE_NOT_FOUND)));
    app.use(errorLogger);
    app.use(errors());
    app.use(errorHandler);
  } catch (err) {
    console.log(err);
  }
};

start();

module.exports = app;
