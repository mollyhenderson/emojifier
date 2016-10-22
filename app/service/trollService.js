'use strict';

function troll(response, reqBody) {
  if(reqBody.user_name === "ian.gall") {
    response.icon_emoji = ":ianizer:";
  }
  return response;
}

module.exports = {
  troll
};
