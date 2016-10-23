'use strict';

const co = require('co');
const errorHandler = require('../util/errorHandler');
const securityCheck = require('../util/securityCheck');
const emojiService = require('../service/emojiService');
const parsingService = require('../service/parsingService');
const trollService = require('../service/trollService');

function emojifyFromSlack(server) {

  // TODO: accept attached images?

  server.post('/slack/emojify', (req, res, next) => {
    const body = req.params;
    console.log('Received POST request from Slack; message is "' + body.text + '" from ' + body.user_name);

    let message;
    try {
      securityCheck.validateToken(body.token);
      message = parsingService.parseSlackMessage(body);
    }
    catch(err) {
      return errorHandler.handleError(err, res, next);
    }

    if(message.type === "help") {
      res.send(200, {text: 'Hi there @' + body.user_name + ', let\'s make some emojis together! Try typing "' + body.trigger_word + ' <url> as <emoji_name>"!'});
      return next();
    }

    co(emojiService.emojify(message.emojis))
    .then(
      function(value) {
        let slackResonse = {
          text: value,
          parse: full
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
