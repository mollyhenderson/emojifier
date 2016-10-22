'use strict';

const R = require('ramda');
const url = require('url');
const Slack = require('../util/slack');

const resizeEmojiTransformations = { src: resize };
const evolveEmoji = emoji => R.evolve(resizeEmojiTransformations, emoji);
const prettyPrintEmoji = emoji => ':' + emoji.name + ':';
const prettyPrintEmojis = emojis => R.join(' ', R.map(prettyPrintEmoji, emojis));

const slack = new Slack({
  url: slackUrl(process.env.SLACK_URL),
  email: process.env.SLACK_EMAIL,
  password: process.env.SLACK_PW
});

function* emojify(emojis) {
  emojis = R.map(evolveEmoji, emojis);
  yield slack.import(emojis);
  return prettyPrintEmojis(emojis);
}

function resize(src) {
  // TODO: check for file format, etc.
  const urlObject = url.parse(src);
  return 'http://' + urlObject.host + '.rsz.io' + urlObject.path + '?mode=max&width=128&height=128';
}

function slackUrl(subdomain) {
  return 'https://' + subdomain + '.slack.com';
}

module.exports = {
  emojify
};
