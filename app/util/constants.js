'use strict';

const SLACK_URL = process.env.SLACK_URL;
const SLACK_EMAIL = process.env.SLACK_EMAIL;
const SLACK_PW = process.env.SLACK_PW;

const EMOJI_TRIGGER = process.env.EMOJI_TRIGGER;
const ALIAS_TRIGGER = process.env.ALIAS_TRIGGER;

const SUGGESTIONS = 'Try one of the following:\n\
- `' + EMOJI_TRIGGER + ' <url> as <name>`\n\
- `' + ALIAS_TRIGGER + ' <existing_emoji_name> as <name>`';

const DONT_UNDERSTAND_MESSAGE = 'I\'m afraid I don\'t understand your request, sorry. :shrug_bot:\n' + SUGGESTIONS;

const HELP_MESSAGE_FN = username => 'Hi there @' + username + ', let\'s make some emojis together! :yay:\n' + SUGGESTIONS;

const FILE_FORMAT_ERROR_MESSAGE = 'Actually, I can only handle `.jpg`, `.jpeg`, or `.png` file extensions for now. :booo: Sorry about that!';

const INVALID_NAME_MESSAGE_FN = name => name + ' is an invalid name. Emoji names can only contain lower case letters, numbers, dashes and underscores. Try again! :dealwithit:';

const HELLO_MESSAGE_FN = username => 'Nice to meet you, @' + username + '! :wave: :yay:';

const EMOJI_ERROR_MESSAGE = 'Error occurred while uploading your requested emoji. Some possible reasons:\
\n\t- The url must refer to an image\
\n\t- The image cannot require authentication\
\n\t- The image cannot be too large\
\nIf you don\'t think any of these cases applies to you, give a shout to Molly to let her know something weird is happening! :alarm:';

const ALIAS_ERROR_MESSAGE = 'Error occurred while creating your requested alias. I honestly can\'t think of any reasons why that would happen, so just go ahead and let Molly know so she can :fix_it: :moley:'

const EMOJI_EXISTS_ERROR_MESSAGE_FN = name => 'Oops, looks like an emoji with that name already exists: :' + name + ': Try again with a different name. :yes2:';

const ALIAS_DNE_ERROR_MESSAGE = 'Looks like the emoji you\'re trying to alias doesn\'t exist yet! :scream:\n' + SUGGESTIONS;

module.exports = {
  SLACK_URL,
  SLACK_EMAIL,
  SLACK_PW,

  EMOJI_TRIGGER,
  ALIAS_TRIGGER,

  HELP_MESSAGE_FN,
  DONT_UNDERSTAND_MESSAGE,
  FILE_FORMAT_ERROR_MESSAGE,
  INVALID_NAME_MESSAGE_FN,
  HELLO_MESSAGE_FN,
  EMOJI_ERROR_MESSAGE,
  ALIAS_ERROR_MESSAGE,
  EMOJI_EXISTS_ERROR_MESSAGE_FN,
  ALIAS_DNE_ERROR_MESSAGE
}
