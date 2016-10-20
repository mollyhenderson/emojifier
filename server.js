var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var co = require('co');
var Slack = require('./lib/slack');


var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var slack = new Slack({
  url: slackUrl(process.env.SLACK_URL),
  email: process.env.SLACK_EMAIL,
  password: process.env.SLACK_PW
});

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

app.post("/emojify", function(req, res) {
    var data = req.body;

    if(!(slackUrl(data.url) === slack.getUrl()) ||
        !(data.email === slack.getEmail()) ||
        !(data.password === slack.getPassword())) {
      console.log("input: " + slackUrl(data.url));
      console.log(slack.getUrl());
      console.log("input: " + data.email);
      console.log(slack.getEmail());
      console.log("input: " + data.password);
      console.log(slack.getPassword());

      res.status(418).json("I'm picky, sorry. Also I don't like you.");
      return;
    }

    var emojis = data.emojis;
    for (var i = 0; i < Object.keys(emojis).length; i++) {
      emojis[i].src = resize(emojis[i].src);
    }

    co(slack.import(emojis));

    res.status(204).json("");
});

function resize(url) {
    var urlParts = url.split('/');
    return "http://" + urlParts[2] + ".rsz.io/" + urlParts.slice(3).join('/') + "?mode=max&width=128&height=128";
}

function slackUrl(subdomain) {
    return 'https://' + subdomain + '.slack.com';
}
