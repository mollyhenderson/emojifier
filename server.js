var express = require("express");
var path = require("path");

var app = express();
app.use(express.static(__dirname + "/public"));

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
    var url = req.body.url;
    var name = req.body.name;

    var data = {
        "url": url,
        "name": name
    }

    res.status(201).json(data);
});
