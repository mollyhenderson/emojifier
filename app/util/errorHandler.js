'use strict';

function handleError(err, res, next) {
  console.log("[ERROR]:", err.message);
  res.send(err.statusCode || 500, err.message);
  return next();
}

module.exports = {
  handleError
};
