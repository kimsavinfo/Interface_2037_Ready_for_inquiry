module.exports = function(app, host){
	var rootDirectory = __dirname + '/..',
		mongoose = require('mongoose'),
		request = require('request'),
		schemaUser = require(rootDirectory+'/schemas/users'),
		modelUser = require(rootDirectory+'/models/users'),
		libString = require(rootDirectory+'/models/libString');

	var	ModelUserDb = mongoose.model('User');
		modelUser.host = host;
		modelUser.model = ModelUserDb;
		
	app.get('/', function(req, res){
		res.status(200);
		res.render(rootDirectory + '/views/client/connection.ejs');
	})

	.post('/', function(req, res){
		var emailClean = libString.htmlEntities(req.body.inputEmail);
		var passwordClean = libString.htmlEntities(req.body.inputPassword);
		modelUser.getUserConnection(emailClean, passwordClean, function(user){
			if (!user) 
			{ 
				res.status(412);
				res.redirect('/');
			}
			else
			{
				req.session.user_id = user._id;
				res.status(200);
				res.redirect('/client/'+user._id+'/questions');
			}
		});
	})

	.get('/client', function(req, res){
		res.status(200);
		res.render(rootDirectory + '/views/client/signIn.ejs');
	})

	.post('/client', function(req, res){
		var emailClean = libString.htmlEntities(req.body.inputEmail);
		var passwordClean = libString.htmlEntities(req.body.inputPassword);
		modelUser.getUserConnection(emailClean, passwordClean, function(user){
			if (!user) 
			{ 
				oneUser = new ModelUserDb({email: emailClean, password: passwordClean});
				modelUser.add(oneUser, function(user){
					req.session.user_id = user._id;
					res.status(201);
					res.redirect('/client/'+user.id+'/questions');
				});
			}
			else
			{
				req.session.user_id = user._id;
				res.status(300);
				res.redirect('/client/'+user._id+'/questions');
			}
		});
	})

	.get('/client/logout', function(req, res){
		delete req.session.user_id;
		res.redirect('/');
	})

	.use('/client/:user_id/questions', function (req, res, next) {

		if (typeof req.session.user_id == 'undefined') 
		{ 
			res.status(412);
			res.redirect('/');
		}
		else
		{
			next();
		}
	})

	.post('/client/:user_id/questions', function(req, res){
		var labelClean = libString.htmlEntities(req.body.label);
		var user_id = req.body.user_id;
		var dataToBeSend = {user_id: user_id ,label: labelClean};
		var options = {
		  	method: 'post',
		  	form: dataToBeSend,
		  	url: "http://127.0.0.1:5000/client/"+user_id+"/questions"
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

	.delete('/client/:user_id/questions/:id', function(req, res){
		var id = req.params.id;
		var user_id = req.body.user_id;
		var dataToBeSend = {user_id: user_id, _method: 'delete'};
		var options = {
		  	method: 'post',
		  	form: dataToBeSend,
		  	url: "http://127.0.0.1:5000/client/"+user_id+"/questions/"+id
		};

		request(options, function (error, response, body) {
  			if (!error && response.statusCode == 204) {
				res.redirect('/client/'+user_id+'/questions');
  			}
  		});
	})

	.get('/client/:user_id/questions', function(req, res){
		var user_id = req.params.user_id;

		request('http://127.0.0.1:5000/client/'+user_id+'/questions', function (error, response, body) {
		  	if (!error && response.statusCode == 200) {
		  		var data = JSON.parse(body);
		    	res.render(rootDirectory + '/views/client/questions.ejs', data );
		  	}
		});
	})

	.get('/client/:user_id/questions/:id', function(req, res){
		var id = req.params.id;
		var user_id = req.params.user_id;
		request('http://127.0.0.1:5000/client/'+user_id+'/questions/'+id, function (error, response, body) {
		  	if (!error && response.statusCode == 200) {
		  		var data = JSON.parse(body);
		    	res.render(rootDirectory + '/views/client/question.ejs', data);
		  	}
		});
	});

};