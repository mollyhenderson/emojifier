'use strict';

const co = require('co');
const emojifierService = require('./emojifierService');

function emojify(server) {
  server.post('/emojify', (req, res, next) => {
    co(emojifierService.emojify(req.body))
    .then(
      function(value) {
        res.send(200, value);
      },
      function(err) {
        console.log("Error encountered:", err);
        res.send(418, err);
      });

    return next();
  });
}

module.exports = emojify;
