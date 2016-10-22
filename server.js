'use strict';

const restify = require('restify');

const server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.bodyParser());

require('./app/controller/emojify')(server);
require('./app/controller/emojifyFromSlack')(server);

server.listen(process.env.PORT || 8080)
