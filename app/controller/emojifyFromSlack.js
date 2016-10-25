'use strict';

const co = require('co');
const constants = require('../util/constants');
const errorHandler = require('../util/errorHandler');
const securityCheck = require('../util/securityCheck');
const emojiService = require('../service/emojiService');
const parsingService = require('../service/parsingService');
const trollService = require('../service/trollService');

function emojifyFromSlack(server) {
  server.post('/slack/emojify', (req, res, next) => {
    const body = req.params;
    console.log('Received POST request from Slack; message is "' + body.text + '" from ' + body.user_name);

    let slackResponse = {
      parse: 'full'
    };
    let message;
    try {
      securityCheck.validateToken(body.token);
      message = parsingService.parseSlackMessage(body);
    }
    catch(err) {
      return errorHandler.handleErrorForSlack(err, res, next);
    }

    if(message.type === 'help') {
      slackResponse.text = constants.HELP_MESSAGE_FN(body.user_name);
      res.send(200, slackResponse);
      return next();
    }

    if(message.type === 'hello') {
      slackResponse.text = constants.HELLO_MESSAGE_FN(body.user_name);
      res.send(200, slackResponse);
      return next();
    }

    co(emojiService.emojify(message.emojis))
    .then(
      function(value) {
        slackResponse.text = value;
        res.send(200, trollService.troll(slackResponse, body));
      },
      function(err) {
        return errorHandler.handleErrorForSlack(err, res, next);
      });

    return next();
  });
}

module.exports = emojifyFromSlack;
