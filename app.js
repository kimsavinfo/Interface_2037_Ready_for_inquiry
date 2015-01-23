var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	bodyParser = require('body-parser'),
	config = require('./config/config');

app.use(bodyParser.urlencoded({extended: true}));

require('./controllers/expert')(app, config.db.host);
require('./controllers/client')(app, config.db.host);

app.use(function (req, res) {
	res.status(404);
   	res.render(__dirname+'/views/statics/error.ejs');
});

server.listen(5000);