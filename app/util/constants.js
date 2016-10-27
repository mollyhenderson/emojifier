'use strict';

const SLACK_URL = process.env.SLACK_URL;
const SLACK_EMAIL = process.env.SLACK_EMAIL;
const SLACK_PW = process.env.SLACK_PW;

const EMOJI_TRIGGER = process.env.EMOJI_TRIGGER || 'emojify';
const ALIAS_TRIGGER = process.env.ALIAS_TRIGGER || 'aliasify';

const SUGGESTIONS = 'Try one of the following:\n\
- `' + EMOJI_TRIGGER + ' <url> as <name>`\n\
- `' + ALIAS_TRIGGER + ' <existing_emoji_name> as <name>`';

const DONT_UNDERSTAND_MESSAGE = 'I\'m afraid I don\'t understand your request, sorry. :shrug_bot:\n' + SUGGESTIONS;

const HELP_MESSAGE_FN = username => 'Hi there @' + username + ', let\'s make some emojis together! :yay:\n' + SUGGESTIONS;

const INVALID_NAME_MESSAGE_FN = name => name + ' is an invalid name. Emoji names can only contain lower case letters, numbers, dashes and underscores. Try again! :dealwithit:';

const HELLO_MESSAGE_FN = username => 'Nice to meet you, @' + username + '! :wave: :yay:';

const SLACK_ERROR_MESSAGE_FN = error => 'Slack didn\'t accept your upload :booo: Here\'s the error:\n `' + error + '`';

module.exports = {
  SLACK_URL,
  SLACK_EMAIL,
  SLACK_PW,

  EMOJI_TRIGGER,
  ALIAS_TRIGGER,

  HELP_MESSAGE_FN,
  DONT_UNDERSTAND_MESSAGE,
  INVALID_NAME_MESSAGE_FN,
  HELLO_MESSAGE_FN,
  SLACK_ERROR_MESSAGE_FN
}
