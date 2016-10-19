var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var Slack = require('lib/slack');

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.get("/emojify/:url/:name", function(req, res) {
    try {
        var url = req.params.url;
        var name = req.params.name;

        var data = {
            "url": url,
            "name": name
        }

        res.status(201).json(data);
    } catch (err) {
        handleError(err);
    }
});

app.post("/emojify", function(req, res) {
    console.log("received post request");
    var url = req.body.url;
    var name = req.body.name;

    // resize the image
    var urlParts = url.split('/');
    url = urlParts[0] + "//" + urlParts[2] + ".rsz.io/" + urlParts.slice(3).join('/') + "?mode=max&width=128&height=128";

    upload(url, name);

    // upload to Slack

    var data = {
        "url": url,
        "name": name
    }

    res.status(201).json(data);
});

function upload(src, name) {
    console.log("upload time!");

  // var user = yield Prompt.start();
  var user = {
      url: url("crosschx"),
      email: "molly.henderson+emojifier@crosschx.com",
      password: "Test1234"
  }
  // var pack = yield Pack.get(user.pack);
  // user.emojis = pack.emojis;
  user.emojis = [
      {
          name: name,
          src: src
      }
  ];
  console.log("emojis: ", user.emojis);

  var slack = new Slack(user, program.debug);
  yield slack.import();
  process.exit();
}


function url(subdomain) {
  return 'https://' + subdomain + '.slack.com';
}
