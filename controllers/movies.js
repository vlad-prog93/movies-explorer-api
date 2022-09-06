const Movie = require('../models/movie');
const ApiErrors = require('../utils/apiErrors');

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        return res.json({ movies })
    } catch (err) {
        return next(ApiErrors.Internal('Ошибка по-умолчанию'));
    }

}

const createMovie = (req, res) => {
    try {
        const owner = req.user._id;
        const {
            country,
            director,
            duration,
            year,
            description,
            image,
            trailerLink,
            thumbnail,
            movieId,
            nameRU,
            nameEN } = req.body;
        const movie = Movie.create({
            country,
            director,
            duration,
            year,
            description,
            image,
            trailerLink,
            thumbnail,
            owner,
            movieId,
            nameRU,
            nameEN
        });
        res.json({ movie });
    } catch (err) {
        if (err.name === 'CastError' || err.name === 'ValidationError') {
            return ApiErrors.BadRequest('Переданы некорректные данные');
        }
        return next(ApiErrors.Internal('Ошибка по-умолчанию'));
    }
}

const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.movieId);
        if (!card) {
            return next(ApiErrors.NotFound('Фильм по указанному id не найден.'));
        }
        if (!(movie.owner === req.user._id)) {
            return next(new ApiErrors(403, 'Нельзя удалать чужой фильм'));
        }
        await Movie.findByIdAndRemove(req.params.movieId);
        return res.send(req.params);
    } catch (err) {
        if (err.name === 'CastError') {
            return next(ApiErrors.BadRequest('Переданы некорректные данные'));
        }
        return next(ApiErrors.Internal('Ошибка по-умолчанию'));
    }

}

module.exports = { getMovies, createMovie, deleteMovie };
