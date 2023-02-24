// models
const Movie = require('../models/movie');

// utils
const ApiErrors = require('../utils/apiErrors');
const {
  ERROR_DEFAULT,
  SEND_NOT_VALID_DATA,
  FILM_NOT_FOUND,
  NOT_ALLOWED_DELETE_FILM,
  CAST_ERROR,
  VALIDATION_ERROR,
} = require('../utils/const');

const getMovies = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const movies = await Movie.find({ owner });
    return res.json({ movies });
  } catch (err) {
    return next(ApiErrors.Internal(ERROR_DEFAULT));
  }
};

const createMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const movie = new Movie({ ...req.body, owner });
    movie.save();
    return res.status(201).json({ movie });
  } catch (err) {
    if (err.name === VALIDATION_ERROR
      || err.name === CAST_ERROR) {
      return next(ApiErrors.BadRequest(SEND_NOT_VALID_DATA));
    }
    return next(ApiErrors.Internal(ERROR_DEFAULT));
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params._id);
    if (!movie) {
      return next(ApiErrors.NotFound(FILM_NOT_FOUND));
    }
    if (!(movie.owner !== req.user._id)) {
      return next(ApiErrors.ForBidden(NOT_ALLOWED_DELETE_FILM));
    }
    await Movie.findByIdAndRemove(req.params._id);
    return res.json(req.params);
  } catch (err) {
    if (err.name === CAST_ERROR) {
      return next(ApiErrors.BadRequest(SEND_NOT_VALID_DATA));
    }
    return next(ApiErrors.Internal(ERROR_DEFAULT));
  }
};

module.exports = { getMovies, createMovie, deleteMovie };
