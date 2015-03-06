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
				//res.redirect(303, '/expert/questions/' + question._id);                    
				res.end();
			} else {
				res.status(200);
				//res.render(rootDirectory+'/views/expert/noQuestion.ejs');
				res.send();
			}
		});
	})

	.put('/expert/questions/:id', function(req, res){
		var id = req.params.id,
			answer = req.body.answer;

		modelQuestion.get(id, function(question){
			if(question.status != 'traité'){
				modelQuestion.update(id, answer, 'traité', function(question){
					res.status(200).json(question);
					//res.render(rootDirectory + '/views/expert/question.ejs', question);
					console.log('Question répondue avec succès ! id :'+question.id);
				});
			} else {
				res.status(303);
				res.location('/expert/questions/' + id);
				res.send();
			}
		});
	})

	.get('/expert/questions/:id', function(req, res){
		var id = req.params.id;
		modelQuestion.get(id, function(question){
			/*res.status(200);
			if(question.status != 'traité'){
				res.render(rootDirectory + '/views/expert/answer.ejs', question);
			} else {
				res.render(rootDirectory + '/views/expert/question.ejs', question);
			}*/
			res.status(200).json(question);
		});
	})

	.get('/expert', function(req, res){
		res.redirect('/expert/questions');
	});
};