'use strict';

function HttpError(statusCode, message) {
  this.statusCode = statusCode;
  this.message = message;
}
HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.name = 'HttpError';
HttpError.prototype.message = '';
HttpError.prototype.constructor = HttpError;

module.exports = HttpError;
