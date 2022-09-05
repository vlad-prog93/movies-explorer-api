const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const routerUsers = require('./router/users');
const routerMovies = require('./router/movies');

const app = express();
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors());
    app.use('/users', routerUsers);
    app.use('/movies', routerMovies);
    app.listen(PORT, () => {
      console.log('Server has been started on', PORT);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
