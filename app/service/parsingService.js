'use strict';

const url = require('url');
const constants = require('../util/constants');
const HttpError = require('../util/httpError');

function parseSlackMessage(body) {
  // sample body.text: 'emojify <url> as <name>'
  //   or: 'aliasify <existing_emoji> as <name>'
  let messageParts = body.text.split(/\s+/g);

  if(messageParts[0] === body.trigger_word) {
    messageParts.shift();
  }

  if(messageParts[0] === 'help') {
    return {type: 'help'};
  }

  if(messageParts[0] === 'hello' || messageParts[0] === 'hi' | messageParts[0] === 'hey') {
    return {type: 'hello'};
  }

  if(messageParts.length != 3 || messageParts[1] !== 'as') {
    throw new HttpError(200, constants.DONT_UNDERSTAND_MESSAGE);
  }

  const emojiName = messageParts[2];
  const otherPart = messageParts[0];

  const emoji = {
    name: emojiName
  };

  const creatingAlias = body.trigger_word === constants.ALIAS_TRIGGER;
  if(creatingAlias) {
    emoji.alias = otherPart;
  }
  else {
    emoji.src = otherPart;
  }

  return {
    type: 'emojis',
    emojis: [emoji]
  }
}

function parseName(alias) {
  return alias.replace(/[\s:]/g, '');
}

function parseUrl(urlString) {
  urlString = urlString.replace(/[<>]/g, '');
  return url.parse(urlString);
}

function validName(name) {
  if(name.match(/^[\da-z_-]+$/g) === null) {
    throw new HttpError(200, constants.INVALID_NAME_MESSAGE_FN(name));
  }
  return name;
}

module.exports = {
  parseSlackMessage,
  parseName,
  parseUrl,
  validName
};
