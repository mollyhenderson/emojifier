'use strict';

const constants = require('../util/constants');
const HttpError = require('../util/httpError');
const Slack = require('../util/slack');

const slack = new Slack({
  url: slackUrl(constants.SLACK_URL),
  email: constants.SLACK_EMAIL,
  password: constants.SLACK_PW
});

function* importEmojis(emojis) {
  try {
    yield slack.import(emojis);
  }
  catch(err) {
    if(err instanceof HttpError) {
      throw err;
    }
    // Q: why?
    // A: don't you think there would be a better comment here if I knew that??
    throw new Error(err);
  }
}

function slackUrl(subdomain) {
  return 'https://' + subdomain + '.slack.com';
}

module.exports = {
  importEmojis
};
