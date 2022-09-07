const jwt = require('jsonwebtoken');

const ApiErrors = require('../utils/apiErrors');
const { UNAUTHORIZED } = require('../utils/const');

const { SECRET_KEY, NODE_ENV } = process.env;

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'TEST');
    if (!decoded) {
      next(ApiErrors.Unauthorized(UNAUTHORIZED));
    }
    req.user = {
      _id: decoded._id,
    };
    next();
  } catch (err) {
    next(ApiErrors.Unauthorized(UNAUTHORIZED));
  }
};

module.exports = checkAuth;
