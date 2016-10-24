'use strict';

const HttpError = require('../util/httpError');

function handleError(err, res, next) {
  console.log("[ERROR]:", err.message);
  res.send(err.statusCode || 500, err.message);
  return next();
}

function handleErrorForSlack(err, res, next) {
  if(err.statusCode) {
    err.message = {text: err.message};
  }
  else {
    console.log("[INTERNAL ERROR]:", err);
    const genericErrorMessage = {
      text: "I'm feeling a little drowsy, maybe try again?\nIf that doesn't work, you should probably bother @molly.henderson until she fixes it!",
      parse: "full"
    }
    err = new HttpError(200, genericErrorMessage);
  }
  return handleError(err, res, next);
}

module.exports = {
  handleError,
  handleErrorForSlack
};
