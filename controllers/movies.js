const Movie = require('../models/movie');
const ApiErrors = require('../utils/apiErrors');
const {
  ERROR_DEFAULT,
  SEND_NOT_VALID_DATA,
  FILM_NOT_FOUND,
  NOT_ALLOWED_DELETE_FILM,

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
    const movie = await Movie.create({ ...req.body, owner });
    return res.status(201).json({ movie });
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      return ApiErrors.BadRequest(SEND_NOT_VALID_DATA);
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
    if (!(movie.owner.includes(req.user._id))) {
      return next(new ApiErrors(403, NOT_ALLOWED_DELETE_FILM));
    }
    await Movie.findByIdAndRemove(req.params._id);
    return res.json(req.params);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(ApiErrors.BadRequest(SEND_NOT_VALID_DATA));
    }
    return next(ApiErrors.Internal(ERROR_DEFAULT));
  }
};

module.exports = { getMovies, createMovie, deleteMovie };
