var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
	methodOverride = require('method-override');

app.use(cookieParser())
.use(expressSession({
	secret: 'W€b-$€rv1c€/',
	saveUninitialized: true,
	resave: true
	}))
.use(bodyParser.urlencoded({extended: true}))
.use(methodOverride(function(req, res){
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
	    var method = req.body._method;
	    delete req.body._method;
	    return method;
	}
}));
app.use('/assets', express.static(__dirname+'/assets'));

require('./controllers/expert')(app);
require('./controllers/client')(app);

app.use(function (req, res) {
	res.status(404);
   	res.render(__dirname+'/views/statics/error.ejs');
});

server.listen(3000);