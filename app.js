var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	config = require('./config/config');


require('./controllers/expert')(app);
require('./controllers/client')(app);

server.listen(5000);