const winston = require("winston");

module.exports = function error(error, req, res, next) {
  winston.error(error.message, error);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
};
