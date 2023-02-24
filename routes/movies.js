const router = require('express').Router();

// middlewares
const {
  validationCreateMovie,
  validationDeleteMovie,
} = require('../middlewares/validation');

// controllers
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validationCreateMovie, createMovie);
router.delete('/:_id', validationDeleteMovie, deleteMovie);

module.exports = router;
