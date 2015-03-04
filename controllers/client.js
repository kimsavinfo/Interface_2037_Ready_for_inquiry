module.exports = function(app, host){
	var rootDirectory = __dirname + '/..',
		mongoose = require('mongoose'),
		schemaQuestion = require(rootDirectory+'/schemas/questions'),
		modelQuestion = require(rootDirectory+'/models/questions'),
		schemaUser = require(rootDirectory+'/schemas/users'),
		modelUser = require(rootDirectory+'/models/users');

	var ModelQuestionDb = mongoose.model('Question');
	modelQuestion.host = host;
	modelQuestion.model = ModelQuestionDb;

	var ModelUserDb = mongoose.model('User');
	modelUser.host = host;
	modelUser.model = ModelUserDb;

	// TODO : Where should we put it ?
	function htmlEntities(str) 
	{
		return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}

	// ==== CLIENT

	app.get('/', function(req, res){
		res.status(200);
		res.render(rootDirectory + '/views/connection.ejs');
	})

	.post('/', function(req, res){
		var emailClean = htmlEntities(req.body.inputEmail);
		var passwordClean = htmlEntities(req.body.inputPassword);
		modelUser.getUserConnection(emailClean, passwordClean, function(user){

			if (!user) 
			{ 
				res.status(412); // TODO : check le code, non sûre
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
		res.render(rootDirectory + '/views/signIn.ejs');
	})

	.post('/client', function(req, res){
		var emailClean = htmlEntities(req.body.inputEmail);
		var passwordClean = htmlEntities(req.body.inputPassword);
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

	// ==== QUESTIONS

	.get('/client/:user_id/questions', function(req, res){
		var user_id = req.params.user_id;
		
		res.status(200);
		modelQuestion.getQuestionsUser(user_id, function(userQuestions){
			res.render(rootDirectory + '/views/addQuestion.ejs', {user_id: user_id, questions: userQuestions} );
		});
	})

	.post('/client/questions', function(req, res){
		var labelClean = htmlEntities(req.body.label);
		var user_id = req.body.user_id;
		oneQuestion = new ModelQuestionDb({user_id: user_id ,label: labelClean});
		modelQuestion.add(oneQuestion, function(question){
			res.status(201);
			res.location('/client/'+user_id+'/questions');
			res.redirect('/client/'+user_id+'/questions');
		});
	})

	.get('/client/:user_id/questions/:id', function(req, res){
		var id = req.params.id;
		modelQuestion.get(id, function(question){
			res.status(200);
			if (!res.getHeader('Cache-Control')) 
			{
				res.setHeader('Cache-Control', 'public, max-age=31557600000');
			}
			res.render(rootDirectory + '/views/question.ejs', question);
		});
	})

	.delete('/client/questions/:id', function(req, res){
		var id = req.params.id;
		var user_id = req.body.user_id;
		modelQuestion.delete(id, function(){
			res.status(204);
			res.location('/client/'+user_id+'/questions');
			res.redirect('/client/'+user_id+'/questions');
		});
	})

	// .get('/client/questions/:id/bot', function(req, res){
	// 	var id = req.params.id;
	// 	modelQuestion.get(id, function(question){
	// 		res.status(200);
	// 		if (!res.getHeader('Cache-Control')) 
	// 		{
	// 			res.setHeader('Cache-Control', 'public, max-age=31557600000');
	// 		}

	// 		while(true)
	// 		{
	// 			res.render(rootDirectory + '/views/question.ejs', question);
	// 			console.log("BOT GET question "+id);
	// 		}
	// 	});
	// });
};