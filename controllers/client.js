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
			res.render(rootDirectory + '/views/question.ejs', question);
		});
	})

	.post('/client/questions', function(req, res){
		oneQuestion = new ModelQuestionDb({label: req.body.label});
		modelQuestion.add(oneQuestion, function(question){
			res.status(201);
			res.send();
			console.log('Question ajoutée avec succès ! id :'+question.id);
		});
	})
};