const Movie = require('../models/movie');
const ApiErrors = require('../utils/apiErrors');

const getMovies = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const movies = await Movie.find({ owner });
    return res.json({ movies });
  } catch (err) {
    return next(ApiErrors.Internal('Ошибка по-умолчанию'));
  }
};

const createMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const movie = await Movie.create({ ...req.body, owner });
    return res.status(201).json({ movie });
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      return ApiErrors.BadRequest('Переданы некорректные данные');
    }
    return next(ApiErrors.Internal('Ошибка по-умолчанию'));
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params._id);
    if (!movie) {
      return next(ApiErrors.NotFound('Фильм по указанному id не найден.'));
    }
    if (!(movie.owner.includes(req.user._id))) {
      return next(new ApiErrors(403, 'Нельзя удалать чужой фильм'));
    }
    await Movie.findByIdAndRemove(req.params._id);
    return res.json(req.params);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(ApiErrors.BadRequest('Переданы некорректные данные'));
    }
    return next(ApiErrors.Internal('Ошибка по-умолчанию'));
  }
};

module.exports = { getMovies, createMovie, deleteMovie };
