'use strict';

const url = require('url');
const HttpError = require('../util/httpError');

function parseSlackMessage(body) {
  // sample body.text: 'emojify {IMAGE_SRC} as {EMOJI_NAME}'
  // also supports leaving off the 'as'
  let messageParts = body.text.split(' ');

  if(messageParts[0] === body.trigger_word) {
    messageParts.shift();
  }

  if(messageParts[0] === "help") {
    return {type: "help"};
  }

  if(messageParts.length < 2) {
    throw new HttpError(200, "I'm afraid I don't understand your request, sorry. :shrug_bot:\nTry typing `" + body.trigger_word + " <url> as <emoji_name>`.");
  }

  const src = messageParts[0];
  const emojiName = messageParts[1] === 'as' ? messageParts[2] : messageParts[1];

  const emojis = [{
    name: emojiName,
    src: src
  }];
  return {
    type: "emojis",
    emojis: emojis
  }
}

function parseUrl(urlString) {
  urlString = urlString.replace(/[<>]/g, '');
  if(!validUrl(urlString)) {
    throw new HttpError(200, "Actually, I can only handle `.jpg`, `.jpeg`, or `.png` file extensions for now. :booo: Sorry about that!");
  }
  return url.parse(urlString);
}

function validUrl(urlString) {
  return urlString.match(/\.(jpeg|jpg|png)$/) != null;
}

function validName(name) {
  if(name.match(/^[\da-z_-]+$/g) === null) {
    throw new HttpError(200, name + " is an invalid name. Custom emoji names can only contain lower case letters, numbers, dashes and underscores. Try again! :dealwithit:");
  }
  return name;
}

module.exports = {
  parseSlackMessage,
  parseUrl,
  validName
};
