'use strict';

const co = require('co');
const errorHandler = require('../util/errorHandler');
const securityCheck = require('../util/securityCheck');
const emojiService = require('../service/emojiService');
const parsingService = require('../service/parsingService');
const trollService = require('../service/trollService');

function emojifyFromSlack(server) {
  server.post('/slack/emojify', (req, res, next) => {
    console.log("Received POST request from Slack: ", req);
    let emojis;
    const body = req.params;
    try {
      securityCheck.validateToken(body.token);
      emojis = parsingService.parseSlackMessage(body);
    }
    catch(err) {
      return errorHandler.handleError(err, res, next);
    }

    co(emojiService.emojify(emojis))
    .then(
      function(value) {
        let slackResonse = {
          text: value
        }
        res.send(200, trollService.troll(slackResonse, body));
      },
      function(err) {
        return errorHandler.handleError(err, res, next);
      });

    return next();
  });
}

module.exports = emojifyFromSlack;
