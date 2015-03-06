module.exports = function(app, host){
	var rootDirectory = __dirname + '/..',
		mongoose = require('mongoose'),
		request = require('request'),
		schemaQuestion = require(rootDirectory+'/schemas/questions'),
		modelQuestion = require(rootDirectory+'/models/questions');

	var ModelQuestionDb = mongoose.model('Question');
	modelQuestion.host = host;
	modelQuestion.model = ModelQuestionDb;

	app.get('/expert/questions', function(req, res){
		request('http://127.0.0.1:5000/expert/questions', function (error, response, body) {
		  	if (!error && response.statusCode == 200) {
		  		var data;
		  		if(body === '') { 
		  			data = {label: ''};
		  		} else {
		  			data = JSON.parse(body);
		  		}

		  		res.render(rootDirectory+'/views/expert/answer.ejs', data);
		  	} /* else if 303
		  		res.status(303);
				res.location('/expert/questions/' + question._id);
				res.send();
			*/
		});
	})

	.get('/expert/questions/:id', function(req, res){
		var id = req.params.id;

		request('http://127.0.0.1:5000/expert/questions/'+id, function (error, response, body) {
		  	if (!error && response.statusCode == 200) {
		  		var data = JSON.parse(body);
		  		if(data.status != 'traité'){
					res.render(rootDirectory + '/views/expert/answer.ejs', data);
				} else {
					res.render(rootDirectory + '/views/expert/question.ejs', data);
				}
		  	}
		});
	})

	.get('/expert', function(req, res){
		res.redirect('/expert/questions');
	});
};