module.exports = function(app, host){
	var rootDirectory = __dirname + '/..',
		mongoose = require('mongoose'),
		schemaQuestion = require(rootDirectory+'/schemas/questions'),
		modelQuestion = require(rootDirectory+'/models/questions');

	var ModelQuestionDb = mongoose.model('Question');
	modelQuestion.host = host;
	modelQuestion.model = ModelQuestionDb;

	app.options('/expert/questions', function(req, res){
		var headers = {};
		// IE8 does not allow domains to be specified, just the *
		// headers["Access-Control-Allow-Origin"] = req.headers.origin;
		headers["Access-Control-Allow-Origin"] = "*";
		headers["Access-Control-Allow-Methods"] = "GET, OPTIONS";
		headers["Access-Control-Allow-Credentials"] = false;
		headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
		res.writeHead(200, headers);
		res.end();
	})

	.get('/expert/questions', function(req, res){
		modelQuestion.getLastQuestion(function(question){
			if(question){
				res.redirect(303, '/expert/questions/' + question._id);
			} else {
				res.status(204).send();
			}
		});
	})

	.options('/expert/questions/:id', function(req, res){
		var headers = {};
		// IE8 does not allow domains to be specified, just the *
		// headers["Access-Control-Allow-Origin"] = req.headers.origin;
		headers["Access-Control-Allow-Origin"] = "*";
		headers["Access-Control-Allow-Methods"] = "GET, PUT, OPTIONS";
		headers["Access-Control-Allow-Credentials"] = false;
		headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
		res.writeHead(200, headers);
		res.end();
	})

	.put('/expert/questions/:id', function(req, res){
		var id = req.params.id,
			answer = req.body.answer;

		modelQuestion.get(id, function(question){
			if(question.status != 'traité'){
				modelQuestion.update(id, answer, 'traité', function(question){
					res.status(200).json(question);
					console.log('Question répondue avec succès ! id :'+question.id);
				});
			} else {
				res.redirect(303, '/expert/questions/' + id);
			}
		});
	})

	.get('/expert/questions/:id', function(req, res){
		var id = req.params.id;
		modelQuestion.get(id, function(question){
			res.status(200).json(question);
		});
	})

	.get('/expert', function(req, res){
		res.redirect('/expert/questions');
	});
};