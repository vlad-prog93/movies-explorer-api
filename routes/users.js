const router = require('express').Router();

// middlewares
const { validationUpdateUser } = require('../middlewares/validation');

// controllers
const { getUser, updateUser } = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', validationUpdateUser, updateUser);

module.exports = router;
