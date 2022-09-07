const { ERROR_DEFAULT } = require('../utils/const');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.code || 500;

  const message = statusCode === 500 ? ERROR_DEFAULT : err.message;
  res.status(statusCode).json({ message });

  next();
};

module.exports = errorHandler;
