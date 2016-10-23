'use strict';

function troll(response, reqBody) {
  if(reqBody.user_name === "ian.gall") {
    response.icon_emoji = ":ianizer:";
  }
  if(reqBody.user_name === "mason") {
    response.icon_emoji = ":dangerzone:";
  }
  if(reqBody.user_name === "matt.dreiss") {
    response.icon_emoji = ":beckyg:";
  }
  if(reqBody.user_name === "michael.mccarrick") {
    response.icon_emoji = ":mikermit:";
  }
  if(reqBody.user_name === "james.smith") {
    response.icon_emoji = ":jamden_smith:";
  }
  if(reqBody.user_name === "jayclouse") {
    response.icon_emoji = ":juicy:";
  }
  if(reqBody.user_name === "tyler.dennis") {
    response.icon_emoji = ":fiesta_dennis:";
  }
  if(reqBody.user_name === "brad.myers") {
    response.icon_emoji = ":smug-trump:";
  }
  return response;
}

module.exports = {
  troll
};
