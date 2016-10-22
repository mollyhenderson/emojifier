'use strict';

const co = require('co');
const errorHandler = require('../util/errorHandler');
const securityCheck = require('../util/securityCheck');
const emojiService = require('../service/emojiService');

function emojify(server) {
  server.post('/emojify', (req, res, next) => {
    try {
      securityCheck.validateCredentials(req.body);
    }
    catch(err) {
      errorHandler.handleError(err, res, next);
    }
    
    co(emojiService.emojify(req.body.emojis))
    .then(
      function(value) {
        res.send(200, value);
      },
      function(err) {
        return errorHandler.handleError(err, res, next);
      });

    return next();
  });
}

module.exports = emojify;
