var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	config = require('./config/config');

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride(function(req, res){
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
	    var method = req.body._method
	    delete req.body._method
	    return method
	}
}));
app.use('/assets', express.static(__dirname+'/assets'));

require('./controllers/expert')(app, config.db.host);
require('./controllers/client')(app, config.db.host);

app.use(function (req, res) {
	if (req.method === 'OPTIONS') {
		var headers = {};
		// IE8 does not allow domains to be specified, just the *
		// headers["Access-Control-Allow-Origin"] = req.headers.origin;
		headers["Access-Control-Allow-Origin"] = "*";
		headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
		headers["Access-Control-Allow-Credentials"] = false;
		headers["Access-Control-Max-Age"] = '86400'; // 24 hours
		headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
		res.writeHead(200, headers);
		res.end();
	} 
	else 
	{
		res.status(404).send();
	}
});

module.exports = server;