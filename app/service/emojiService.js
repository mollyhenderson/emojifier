'use strict';

const R = require('ramda');
const url = require('url');
const HttpError = require('../util/httpError');
const slackService = require('../service/slackService');

const resizeEmojiTransformations = { src: resize };
const evolveEmoji = emoji => R.evolve(resizeEmojiTransformations, emoji);
const prettyPrintEmoji = emoji => ':' + emoji.name + ':';
const prettyPrintEmojis = emojis => R.join(' ', R.map(prettyPrintEmoji, emojis));

function* emojify(emojis) {
  emojis = R.map(evolveEmoji, emojis);
  yield slackService.importEmojis(emojis);
  return prettyPrintEmojis(emojis);
}

function resize(src) {
  let urlObject;
  try {
    // TODO: check for file format, etc.
    urlObject = url.parse(src);
  } catch(err) {
    throw new HttpError(400, {text: "Malformed url"});
  }
  return 'http://' + urlObject.host + '.rsz.io' + urlObject.path + '?mode=max&width=128&height=128';
}

module.exports = {
  emojify
};
