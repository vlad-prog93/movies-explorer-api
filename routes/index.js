const router = require('express').Router();

// middlewares
const { validationSignUp, validationSignIn } = require('../middlewares/validation');
const checkAuth = require('../middlewares/auth');

// routes
const routerUsers = require('./users');
const routerMovies = require('./movies');

// controllers
const { createUser, login } = require('../controllers/users');

router.post('/signin', validationSignIn, login);
router.post('/signup', validationSignUp, createUser);
router.use(checkAuth);
router.use('/users', routerUsers);
router.use('/movies', routerMovies);

module.exports = router;
