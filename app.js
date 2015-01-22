var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	bodyParser = require('body-parser'),
	config = require('./config/config');

app.use(bodyParser.urlencoded({extended: true}));

require('./controllers/expert')(app);
require('./controllers/client')(app);

server.listen(5000);