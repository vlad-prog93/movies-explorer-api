const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// models
const User = require('../models/user');

// utils
const ApiErrors = require('../utils/apiErrors');
const {
  USER_ALREADY_EXIST,
  SEND_NOT_VALID_DATA,
  ERROR_DEFAULT,
  WRONG_LOGIN_OR_PASSWORD,
  WRONG_ID,
  USER_NOT_FOUND,
  DUBLICATE_MONGOOSE_ERROR_CODE,
  SOLT_ROUND,
  CAST_ERROR,
  VALIDATION_ERROR,
} = require('../utils/const');

const { SECRET_KEY, NODE_ENV } = process.env;

const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return next(ApiErrors.Conflict(USER_ALREADY_EXIST));
    }
    const hashPassword = bcrypt.hashSync(password, SOLT_ROUND);
    const user = new User({ email, password: hashPassword, name });
    await user.save();
    return res.status(201).json({ _id: user._id });
  } catch (err) {
    if (err.name === VALIDATION_ERROR) {
      return next(ApiErrors.BadRequest(SEND_NOT_VALID_DATA));
    }
    if (err.code === DUBLICATE_MONGOOSE_ERROR_CODE) {
      return next(ApiErrors.Conflict(USER_ALREADY_EXIST));
    }
    return next(ApiErrors.Internal(ERROR_DEFAULT));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(ApiErrors.Unauthorized(WRONG_LOGIN_OR_PASSWORD));
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(ApiErrors.Unauthorized(WRONG_LOGIN_OR_PASSWORD));
    }
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? SECRET_KEY : 'TEST', { expiresIn: '7d' });
    return res.json({ token });
  } catch (err) {
    return next(ApiErrors.Internal(ERROR_DEFAULT));
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return next(ApiErrors.NotFound(USER_NOT_FOUND));
    }
    return res.send(user);
  } catch (err) {
    if (err.name === CAST_ERROR) {
      return next(ApiErrors.BadRequest(WRONG_ID));
    }
    return next(ApiErrors.Internal(ERROR_DEFAULT));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.user._id;
    const { email, name } = req.body;
    const user = await User
      .findByIdAndUpdate(id, { email, name }, { runValidators: true, new: true });
    return res.send(user);
  } catch (err) {
    if (err.name === CAST_ERROR) {
      return next(ApiErrors.BadRequest(WRONG_ID));
    }
    if (err.name === VALIDATION_ERROR) {
      return next(ApiErrors.BadRequest(SEND_NOT_VALID_DATA));
    }
    return next(ApiErrors.Internal(ERROR_DEFAULT));
  }
};

module.exports = {
  getUser, updateUser, createUser, login,
};
