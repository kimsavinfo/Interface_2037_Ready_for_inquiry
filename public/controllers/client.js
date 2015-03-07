module.exports = function(app, host){
	var rootDirectory = __dirname + '/..',
		mongoose = require('mongoose'),
		request = require('request'),
		libString = require(rootDirectory+'/models/libString');

	app.get('/', function(req, res){
		res.redirect('/client/questions');
	})

	.get('/client', function(req, res){
		res.redirect('/client/questions');
	})

	.get('/client/questions', function(req, res){
		var user_id = req.params.user_id;

		request('http://127.0.0.1:5000/client/questions', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var data = JSON.parse(body);
				res.render(rootDirectory + '/views/client/questions.ejs', data );
			}
		});
	})

	.post('/client/questions', function(req, res){
		var labelClean = libString.htmlEntities(req.body.label);
		var dataToBeSend = {label: labelClean};
		var options = {
		  	method: 'post',
		  	form: dataToBeSend,
		  	url: "http://127.0.0.1:5000/client/questions"
		};

		request(options, function (error, response, body) {
			if (!error && response.statusCode == 201) {
				request('http://127.0.0.1:5000'+response.headers.location, function (error, response, body) {
					if (!error && response.statusCode == 200) {
						var data = JSON.parse(body);
						res.render(rootDirectory + '/views/client/questions.ejs', data );
					}
				});
			}
		});
	})

	.post('/client/questions/label', function(req, res){
		var labelClean = libString.htmlEntities(req.body.label);
		var dataToBeSend = {label: labelClean};
		var options = {
		  	method: 'post',
		  	form: dataToBeSend,
		  	url: "http://127.0.0.1:5000/client/questions/label"
		};
		
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var data = JSON.parse(body);
				res.render(rootDirectory + '/views/client/questions.ejs', data );
			}
		});
	})

	.get('/client/questions/:id', function(req, res){
		var id = req.params.id;
		request('http://127.0.0.1:5000/client/questions/'+id, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var data = JSON.parse(body);
				res.render(rootDirectory + '/views/client/question.ejs', data);
			}
		});
	})

	.delete('/client/questions/:id', function(req, res){
		var id = req.params.id;
		var dataToBeSend = {_method: 'delete'};
		var options = {
			method: 'post',
			form: dataToBeSend,
			url: "http://127.0.0.1:5000/client/questions/"+id
		};

		request(options, function (error, response, body) {
			if (!error && response.statusCode == 204) {
				res.redirect('/client/questions');
			}
		});
	})

};