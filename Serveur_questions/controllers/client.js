module.exports = function(app){
	var rootDirectory = __dirname + '/..',
		modelQuestion = require(rootDirectory+'/models/questions');

	app.get('/client/questions', function(req, res){
		modelQuestion.getLastQuestion(function(question){
			res.render(rootDirectory + '/views/question.ejs', question);
		});
	});
};