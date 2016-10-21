'use strict'

const request = require('request');
const co = require('co');

const slack = new require('./slack')({
  url: slackUrl(process.env.SLACK_URL),
  email: process.env.SLACK_EMAIL,
  password: process.env.SLACK_PW
});

function emojify(options) {
  const url = options.url;
  const email = options.email;
  const password = options.password;
  const emojis = options.emojis;

  if(!(slackUrl(url) === slack.getUrl()) ||
      !(email === slack.getEmail()) ||
      !(password === slack.getPassword())) {
    throw "I'm picky, sorry. Also I don't like you.";
  }

  for (var i = 0; i < Object.keys(emojis).length; i++) {
    emojis[i].src = resize(emojis[i].src);
  }

  co(slack.import(emojis));

  let returnValue = "";
  for (var i = 0; i < Object.keys(emojis).length; i++) {
    returnValue += ":" + emojis[i].name + ": ";
  }
  return returnValue;
}

function resize(url) {
    const urlParts = url.split('/');
    return "http://" + urlParts[2] + ".rsz.io/" + urlParts.slice(3).join('/') + "?mode=max&width=128&height=128";
}

function slackUrl(subdomain) {
    return 'https://' + subdomain + '.slack.com';
}

module.exports = {
  emojify,
  resize,
  slackUrl
};
