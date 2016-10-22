'use strict';

const restify = require('restify');

const server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.bodyParser());

require('./app/controller/emojify')(server);
require('./app/controller/emojifyFromSlack')(server);

server.listen(8080);
