module.exports = function(app, host){
	var rootDirectory = __dirname + '/..',
		mongoose = require('mongoose'),
		schemaQuestion = require(rootDirectory+'/schemas/questions'),
		modelQuestion = require(rootDirectory+'/models/questions'),
		libString = require(rootDirectory+'/models/libString');

	var ModelQuestionDb = mongoose.model('Question');
		modelQuestion.host = host;
		modelQuestion.model = ModelQuestionDb;

	app.options('/client/questions', function(req, res){
		var headers = {};
		// IE8 does not allow domains to be specified, just the *
		// headers["Access-Control-Allow-Origin"] = req.headers.origin;
		headers["Access-Control-Allow-Origin"] = "*";
		headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS";
		headers["Access-Control-Allow-Credentials"] = false;
		headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
		res.writeHead(200, headers);
		res.end();
	})

	.get('/client/questions', function(req, res){

		var labelClean = "";
		
		if (typeof req.body.label != 'undefined')
			labelClean = libString.htmlEntities(req.body.label);

		if(labelClean.length > 0)
		{
			labelClean = libString.htmlEntities(req.body.label);
			modelQuestion.findLabel(labelClean,function(questions){
				res.status(200).json({questions : questions});
			});
		}
		else
		{
			modelQuestion.getLastQuestions(function(questions){
				res.status(200).json({questions : questions});
			});
		}
	})

	.post('/client/questions', function(req, res){
		var labelClean = libString.htmlEntities(req.body.label);
		var oneQuestion = new ModelQuestionDb({label: labelClean});
		modelQuestion.add(oneQuestion, function(question){
			res.redirect(201, '/client/questions');
		});
	})

	.options('/client/questions/:id', function(req, res){
		var headers = {};
		// IE8 does not allow domains to be specified, just the *
		// headers["Access-Control-Allow-Origin"] = req.headers.origin;
		headers["Access-Control-Allow-Origin"] = "*";
		headers["Access-Control-Allow-Methods"] = "GET, DELETE, OPTIONS";
		headers["Access-Control-Allow-Credentials"] = false;
		headers["Access-Control-Max-Age"] = '31557600000'; // 24 hours
		headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
		res.writeHead(200, headers);
		res.end();
	})

	.get('/client/questions/:id', function(req, res){
		var id = req.params.id;
		modelQuestion.get(id, function(question){
			if (!res.getHeader('Cache-Control')) 
			{
				res.setHeader('Cache-Control', 'public, max-age=31557600000');
			}
			res.location('/client/questions/'+ question._id);
			res.status(200).json(question);
		});
	})

	.delete('/client/questions/:id', function(req, res){
		var id = req.params.id;
		modelQuestion.delete(id, function(){
			res.status(204).send();
		});
	});

	// .get('/client/questions/:id/bot', function(req, res){
	// 	var id = req.params.id;
	// 	modelQuestion.get(id, function(question){
	// 		res.status(200);
	// 		if (!res.getHeader('Cache-Control')) 
	// 		{
	// 			res.setHeader('Cache-Control', 'public, max-age=31557600000');
	// 		}

	// 		while(true)
	// 		{
	// 			res.render(rootDirectory + '/views/client/question.ejs', question);
	// 			console.log("BOT GET question "+id);
	// 		}
	// 	});
	// });
};