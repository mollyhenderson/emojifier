'use strict';

function troll(response, reqBody) {
  switch(reqBody.user_name) {
    case 'ian.gall':
      response.icon_emoji = ":ianizer:";
      break;
    case 'mason':
      response.icon_emoji = ":dangerzone:";
      break;
    case 'matt.dreiss':
      response.icon_emoji = ":beckyg:";
      break;
    case 'michael.mccarrick':
      response.icon_emoji = ":yay:";
      break;
    case 'james.smith':
      response.icon_emoji = ":jamden_smith:";
      break;
    case 'jayclouse':
      response.icon_emoji = ":juicy:";
      break;
    case 'tyler.dennis':
      response.icon_emoji = ":fiesta_dennis:";
      break;
    case 'brad.myers':
      response.icon_emoji = ":smug-trump:";
      break;
  }
  return response;
}

module.exports = {
  troll
};
