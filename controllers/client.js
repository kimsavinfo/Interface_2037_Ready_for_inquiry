module.exports = function(app, host){
	var rootDirectory = __dirname + '/..',
		mongoose = require('mongoose'),
		schemaQuestion = require(rootDirectory+'/schemas/questions'),
		modelQuestion = require(rootDirectory+'/models/questions');

	var ModelQuestionDb = mongoose.model('Question');
	modelQuestion.host = host;
	modelQuestion.model = ModelQuestionDb;

	app.get('/client/questions', function(req, res){
		res.render(rootDirectory + '/views/addQuestion.ejs');
	})

	.get('/client/questions/:objectId', function(req, res){
		var objectId = req.params.objectId;
		modelQuestion.get(objectId, function(question){
			res.render(rootDirectory + '/views/question.ejs', question);
		});
	})

	.post('/client/questions', function(req, res){
		oneQuestion = new ModelQuestionDb({label: req.body.label});
		modelQuestion.add(oneQuestion, function(){
			console.log('Question ajoutée avec succès !')
		});
	})
};