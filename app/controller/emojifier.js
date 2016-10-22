'use strict';

const co = require('co');
const emojiService = require('../service/emojiService');
const parsingService = require('../service/parsingService');

function emojify(server) {
  server.post('/emojify', (req, res, next) => {
    let emojis;
    try {
      emojis = parsingService.parseSlackMessage(req.body);
    }
    catch(err) {
      return handleError(err, res, next);
    }

    co(emojiService.emojify(emojis))
    .then(
      function(value) {
        res.send(200, value);
      },
      function(err) {
        return handleError(err, res, next);
      });

    return next();
  });
}

function handleError(err, res, next) {
  console.log("[ERROR]:", err.message);
  res.send(err.statusCode || 500, err.message);
  return next();
}

module.exports = emojify;
