module.exports = function(app, host){
	var rootDirectory = __dirname + '/..',
		mongoose = require('mongoose'),
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
		

	
	app.get('/client/:user_id/questions', function(req, res){
		var user_id = req.params.user_id;

		
		modelQuestion.getQuestionsUser(user_id, function(userQuestions){
			res.status(200).json({questions : userQuestions, user_id : user_id});
		});
	})

	.post('/client/:user_id/questions', function(req, res){
		var labelClean = libString.htmlEntities(req.body.label);
		var user_id = req.body.user_id;
		var oneQuestion = new ModelQuestionDb({user_id: user_id ,label: labelClean});
		modelQuestion.add(oneQuestion, function(question){
			res.status(201);
			res.location('/client/'+user_id+'/questions');
			res.redirect('/client/'+user_id+'/questions');
		});
	})

	.get('/client/:user_id/questions/:id', function(req, res){
		var id = req.params.id;
		var user_id = req.params.user_id;
		modelQuestion.get(id, function(question){
			if (!res.getHeader('Cache-Control')) 
			{
				res.setHeader('Cache-Control', 'public, max-age=31557600000');
			}
			res.status(200).json(question);
		});
	})

	.delete('/client/:user_id/questions/:id', function(req, res){
		var id = req.params.id;
		var user_id = req.body.user_id;
		modelQuestion.delete(id, function(){
			res.status(204);
			res.location('/client/'+user_id+'/questions');
			res.redirect('/client/'+user_id+'/questions');
		});
	});

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
	// 			res.render(rootDirectory + '/views/client/question.ejs', question);
	// 			console.log("BOT GET question "+id);
	// 		}
	// 	});
	// });
};