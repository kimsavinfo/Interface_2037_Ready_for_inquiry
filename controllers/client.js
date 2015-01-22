module.exports = function(app, host){
	var rootDirectory = __dirname + '/..',
		mongoose = require('mongoose'),
		schemaQuestion = require(rootDirectory+'/schemas/questions'),
		modelQuestion = require(rootDirectory+'/models/questions');

	modelQuestion.host = host;
	var Question = mongoose.model('Question');

	app.get('/client/questions', function(req, res){
		res.render(rootDirectory + '/views/addQuestion.ejs');
	})

	.post('/client/questions', function(req, res){
		oneQuestion = new Question({label: req.body.label});
		modelQuestion.add(oneQuestion, function(){
			console.log('Question ajoutée avec succès !')
		});
	})
};