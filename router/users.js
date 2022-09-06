const express = require('express');
const router = express.Router();

const { getUser, updateUser } = require('../controllers/users');
const { validationUpdateUserInfo } = require('../middlewares/validation');

router.get('/me', getUser);
router.patch('/me', validationUpdateUserInfo, updateUser);



module.exports = router;
