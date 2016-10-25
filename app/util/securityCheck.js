'use strict';

const constants = require('../util/constants');
const HttpError = require('../util/httpError');
const slackService = require('../service/slackService');

function validateToken(token) {
  // make sure this call is at least probably coming from our webhook ¯\_(ツ)_/¯
  if(token !== process.env.SLACK_TOKEN) {
    const slackMessage = {
      text: "Sorry, I don't really want to talk to you.\n(Your teammate probably didn't set up my permissions correctly; go yell at them!)"
    };
    console.log("Token denied: ", token);
    throw new HttpError(200, slackMessage);
  }
}

function validateCredentials(credentials) {
  // if you want to upload from outside of slack, you have to provide all of the credentials.
  // Because I don't know of an actual good way to do this.
  if(!(credentials.url === constants.SLACK_URL) ||
      !(credentials.email === constants.SLACK_EMAIL) ||
      !(credentials.password === constants.SLACK_PW)) {
    throw new HttpError(401, "Please provide the url, email, and password associated with this emojifier.");
  }
}

module.exports = {
  validateToken,
  validateCredentials
}
