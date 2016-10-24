'use strict';

const R = require('ramda');
const parsingService = require('../service/parsingService');
const slackService = require('../service/slackService');

const resizeEmojiTransformations = { src: R.compose(resize, parsingService.parseUrl) };
const evolveEmoji = emoji => R.evolve(resizeEmojiTransformations, emoji);
const prettyPrintEmoji = emoji => ':' + emoji.name + ':';
const prettyPrintEmojis = emojis => R.join(' ', R.map(prettyPrintEmoji, emojis));

function* emojify(emojis) {
  emojis = R.map(evolveEmoji, emojis);
  yield slackService.importEmojis(emojis);
  return prettyPrintEmojis(emojis);
}

function resize(urlObject) {
  return 'http://' + urlObject.host + '.rsz.io' + urlObject.path + '?mode=max&width=128&height=128';
}

module.exports = {
  emojify
};
