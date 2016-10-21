'use strict';

const emojifierService = require('./emojifierService');

function emojify(server) {
  server.post('/emojify', (req, res, next) => {
    var data = req.body;

var response = "";
    try {
      response = emojifierService.emojify(data);
    } catch (err) {
      res.send(418, err);
      return next();
    }

    res.send(200, response);

    return next();
  });
}

module.exports = emojify;
