'use strict';

function troll(response, reqBody) {
  switch(reqBody.user_name) {
    case 'brad.myers':
      response.icon_emoji = ':smug-trump:';
      break;
    case 'ian.gall':
      response.icon_emoji = ':ianizer:';
      break;
    case 'jayclouse':
      response.icon_emoji = ':juicy:';
      break;
    case 'james.smith':
      response.icon_emoji = ':troll:';
      break;
    case 'mason':
      response.icon_emoji = ':dangerzone:';
      break;
    case 'matt.dreiss':
      response.icon_emoji = ':beckyg:';
      break;
    case 'michael.mccarrick':
      response.icon_emoji = ':yay:';
      break;
    case 'sam.randolph':
      response.icon_emoji = ':annoying_dog:';
      break;
    case 'tyler.dennis':
      response.icon_emoji = ':fiesta_dennis:';
      break;
  }
  return response;
}

module.exports = {
  troll
};
