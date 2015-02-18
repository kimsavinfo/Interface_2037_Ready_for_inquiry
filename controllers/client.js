module.exports = function(app, host){
	var rootDirectory = __dirname + '/..',
		mongoose = require('mongoose'),
		schemaQuestion = require(rootDirectory+'/schemas/questions'),
		modelQuestion = require(rootDirectory+'/models/questions');

	var ModelQuestionDb = mongoose.model('Question');
	modelQuestion.host = host;
	modelQuestion.model = ModelQuestionDb;

	app.get('/client/questions', function(req, res){
		res.status(200);
		res.render(rootDirectory + '/views/addQuestion.ejs');
	})

	.get('/client/questions/:id', function(req, res){
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

	.post('/client/questions', function(req, res){
		oneQuestion = new ModelQuestionDb({label: req.body.label});
		modelQuestion.add(oneQuestion, function(question){
			res.status(201);
			res.location('/client/questions/' + question.id);
		});
	})

	.delete('/client/questions/:id', function(req, res){
		var id = req.params.id;
		modelQuestion.delete(id, function(){
			res.status(204);
			res.location('/client/questions/');
			res.send();
		});
	})

	.get('/client/questions/:id/bot', function(req, res){
		var id = req.params.id;
		modelQuestion.get(id, function(question){
			res.status(200);
			if (!res.getHeader('Cache-Control')) 
			{
				res.setHeader('Cache-Control', 'public, max-age=31557600000');
			}

			while(true)
			{
				res.render(rootDirectory + '/views/question.ejs', question);
				console.log("BOT GET question "+id);
			}
		});
	});
};