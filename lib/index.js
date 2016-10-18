var express = require('express')
 
var app = express()
 
app.get('/hello', function(req, res) {
  res.json({hello: "Hello World!"})
})
 
app.listen(3000)