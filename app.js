const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { errors } = require('celebrate');
const helmet = require("helmet");

const routerUsers = require('./router/users');
const routerMovies = require('./router/movies');
const { createUser, login } = require('./controllers/users');
const { validationSignUp, validationSignIn } = require('./middlewares/validation');
const errorHandler = require('./middlewares/errorHandler');
const checkAuth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
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
    app.use(requestLogger);
    app.post('/signin', validationSignIn, login);
    app.post('/signup', validationSignUp, createUser);
    app.use(checkAuth);
    app.use('/users', routerUsers);
    app.use('/movies', routerMovies);
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
