'use strict';

const Slack = require('../util/slack');

const url = process.env.SLACK_URL;
const email = process.env.SLACK_EMAIL;
const password = process.env.SLACK_PW;

const slack = new Slack({
  url: slackUrl(url),
  email: email,
  password: password
});

function* importEmojis(emojis) {
  try {
    yield slack.import(emojis);
  }
  catch(err) {
    // Q: why?
    // A: don't you think there would be a better comment here if I knew that??
    throw new Error(err);
  }
}

function slackUrl(subdomain) {
  return 'https://' + subdomain + '.slack.com';
}

module.exports = {
  url,
  email,
  password,
  importEmojis
};
