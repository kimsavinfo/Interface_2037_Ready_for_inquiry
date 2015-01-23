module.exports = function(app, host){
	var rootDirectory = __dirname + '/..',
		mongoose = require('mongoose'),
		schemaQuestion = require(rootDirectory+'/schemas/questions'),
		modelQuestion = require(rootDirectory+'/models/questions');

	var ModelQuestionDb = mongoose.model('Question');
	modelQuestion.host = host;
	modelQuestion.model = ModelQuestionDb;

	app.get('/expert/questions', function(req, res){
		res.status(200);
		res.render(rootDirectory + '/views/addQuestion.ejs');
	})

	.get('/expert/questions/:id', function(req, res){
		var id = req.params.id;
		modelQuestion.get(id, function(question){
			res.status(200);
			res.render(rootDirectory + '/views/answerQuestion.ejs', question);
		});
	})

	.put('/expert/questions/:id', function(req, res){
		var id = req.params.id,
			answer = req.body.answer;

		modelQuestion.update(id, answer, 'traité', function(question){
			res.status(200);
			res.render(rootDirectory + '/views/question.ejs', question);
			console.log('Question répondue avec succès ! id :'+question.id);
		});
	})

	.get('/expert', function(req, res){
		res.redirect('/expert/questions');
	});
};