module.exports = function(app, host){
	var rootDirectory = __dirname + '/..',
		mongoose = require('mongoose'),
		schemaQuestion = require(rootDirectory+'/schemas/questions'),
		modelQuestion = require(rootDirectory+'/models/questions');

	var ModelQuestionDb = mongoose.model('Question');
	modelQuestion.host = host;
	modelQuestion.model = ModelQuestionDb;

	app.get('/expert/questions', function(req, res){
		modelQuestion.getLastQuestion(function(question){
			if(question){
				res.status(303);
				res.location('/expert/questions/' + question._id);
				res.send();
			} else {
				res.status(404);
				res.render(rootDirectory+'/views/statics/error.ejs');
			}
		});
	})

	.put('/expert/questions/:id', function(req, res){
		var id = req.params.id,
			answer = req.body.answer;

		modelQuestion.get(id, function(question){
			if(question.status != 'traité'){
				modelQuestion.update(id, answer, 'traité', function(question){
					res.status(200);
					res.render(rootDirectory + '/views/question.ejs', question);
					console.log('Question répondue avec succès ! id :'+question.id);
				});
			} else {
				res.status(303);
				res.location('/client/' + question.user_id + '/questions/' + id);
				res.send();
			}
		});
	})

	.get('/expert/questions/:id', function(req, res){
		var id = req.params.id;
		modelQuestion.get(id, function(question){
			if(question.status != 'traité'){
				res.status(200);
				res.render(rootDirectory + '/views/answerQuestion.ejs', question);
			} else {
				res.status(303);
				res.location('/client/' + question.user_id + '/questions/' + id);
				res.send();
			}
		});
	})

	.get('/expert', function(req, res){
		res.redirect('/expert/questions');
	});
};