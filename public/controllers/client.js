module.exports = function(app, host){
	var rootDirectory = __dirname + '/..',
		mongoose = require('mongoose'),
		request = require('request'),
		schemaQuestion = require(rootDirectory+'/schemas/questions'),
		modelQuestion = require(rootDirectory+'/models/questions'),
		schemaUser = require(rootDirectory+'/schemas/users'),
		modelUser = require(rootDirectory+'/models/users'),
		libString = require(rootDirectory+'/models/libString');

	var ModelQuestionDb = mongoose.model('Question');
		modelQuestion.host = host;
		modelQuestion.model = ModelQuestionDb;
		ModelUserDb = mongoose.model('User');
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
					res.status(201);
					res.redirect('/client/'+user.id+'/questions');
				});
			}
			else
			{
				res.status(300);
				res.redirect('/client/'+user._id+'/questions');
			}
		});
	})

	/*.use('/client/:user_id/questions', function (req, res, next) {
		var user_id = req.params.user_id;
		modelUser.get(user_id, function(user){
			if (!user) 
			{ 
				res.status(412);
				res.redirect('/');
			}
			else
			{
				next();
			}
		});
	})*/

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