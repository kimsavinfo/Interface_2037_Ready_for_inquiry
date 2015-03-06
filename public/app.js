var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	config = require('./config/config');

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride(function(req, res){
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
	    var method = req.body._method;
	    delete req.body._method;
	    return method;
	}
}));
app.use('/assets', express.static(__dirname+'/assets'));

require('./controllers/expert')(app, config.db.host);
require('./controllers/client')(app, config.db.host);

app.use(function (req, res) {
	res.status(404);
   	res.render(__dirname+'/views/statics/error.ejs');
});

server.listen(3000);