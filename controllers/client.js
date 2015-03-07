module.exports = function(app, host){
	var rootDirectory = __dirname + '/..',
		mongoose = require('mongoose'),
		schemaQuestion = require(rootDirectory+'/schemas/questions'),
		modelQuestion = require(rootDirectory+'/models/questions'),
		libString = require(rootDirectory+'/models/libString');

	var ModelQuestionDb = mongoose.model('Question');
		modelQuestion.host = host;
		modelQuestion.model = ModelQuestionDb;

	app.get('/client/questions', function(req, res){
		var user_id = req.params.user_id;

		modelQuestion.getLastQuestions(function(questions){
			res.status(200).json({questions : questions});
		});
	})

	.post('/client/questions', function(req, res){
		var labelClean = libString.htmlEntities(req.body.label);
		var oneQuestion = new ModelQuestionDb({label: labelClean});
		modelQuestion.add(oneQuestion, function(question){
			res.redirect(201, '/client/questions');
		});
	})

	.post('/client/questions/label', function(req, res){
		var labelClean = libString.htmlEntities(req.body.label);
		modelQuestion.findLabel(labelClean,function(questions){
			console.log(questions);
			res.status(200).json({questions : questions});
		});
	})

	.get('/client/questions/:id', function(req, res){
		var id = req.params.id;
		modelQuestion.get(id, function(question){
			if (!res.getHeader('Cache-Control')) 
			{
				res.setHeader('Cache-Control', 'public, max-age=31557600000');
			}
			res.status(200).json(question);
		});
	})

	.get('/client/questions/:id', function(req, res){
		var id = req.params.id;
		modelQuestion.get(id, function(question){
			if (!res.getHeader('Cache-Control')) 
			{
				res.setHeader('Cache-Control', 'public, max-age=31557600000');
			}
			res.status(200).json(question);
		});
	})

	.delete('/client/questions/:id', function(req, res){
		var id = req.params.id;
		modelQuestion.delete(id, function(){
			res.status(204).send();
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