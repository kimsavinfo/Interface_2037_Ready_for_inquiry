module.exports = function(app){

	var rootDirectory = __dirname + '/..', 
		modelQuestions = require(rootDirectory+'/models/questions');

	app.get('/expert/questions/:id', function(req, res){
		res.json({id: req.params.id});
	})

	.get('/expert/questions', function(req, res){
		modelQuestions.getLastQuestion(function(question){
			res.json({id: question.id, question: question.libelle});
		});
	})

	.get('/expert', function(req, res){
		res.redirect('/expert/questions');
	});

};