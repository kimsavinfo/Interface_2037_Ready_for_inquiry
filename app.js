var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	bodyParser = require('body-parser'),
	config = require('./config/config');

app.use(bodyParser.urlencoded({extended: true}));

require('./controllers/expert')(app, config.db.host);
require('./controllers/client')(app, config.db.host);

server.listen(5000);