'use strict';

const imageMagick = require('gm').subClass({ imageMagick: true });
const path = require('path');

const R = require('ramda');
const request = require('request');
const parsingService = require('../service/parsingService');
const slackService = require('../service/slackService');

const emojiTransformations = {
  src: R.compose(resize, parsingService.parseUrl),
  name: R.compose(parsingService.validName, parsingService.parseName),
  alias: R.compose(parsingService.validName, parsingService.parseName)
};
const evolveEmoji = emoji => R.evolve(emojiTransformations, emoji);
const prettyPrintEmoji = emoji => ':' + emoji.name + ':';
const prettyPrintEmojis = emojis => R.join(' ', R.map(prettyPrintEmoji, emojis));

function* emojify(emojis) {
  gmTest(emojis[0].src, emojis[0].name);
  emojis = R.map(evolveEmoji, emojis);
  yield slackService.importEmojis(emojis);
  return prettyPrintEmojis(emojis);
}

function gmTest(src, name) {
  // output all available image properties
  imageMagick(request(src))
  .resize(128, 128)
  .noProfile()
  .write(path.dirname(process.mainModule.filename) + '/' + name + '.jpg', function (err) {
    if (!err) {
      console.log('done');
    } else {
      console.log(err);
    }
  });
}

function resize(urlObject) {
  return 'http://' + urlObject.host + '.rsz.io' + urlObject.path + '?mode=max&width=128&height=128';
}

module.exports = {
  emojify
};
