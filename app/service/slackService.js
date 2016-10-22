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
  yield slack.import(emojis);
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
