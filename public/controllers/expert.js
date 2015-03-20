module.exports = function(app){
	var rootDirectory = __dirname + '/..',
		mongoose = require('mongoose'),
		request = require('request'),
		appPath = 'http://127.0.0.1:5000';


	app.get('/expert/questions/last', function(req, res){
		request(appPath+'/expert/questions/last', function (error, response, body) {
		  	if (!error){
		  		if(response.statusCode == 200) {
			  		var data;
			  		if(body === '') { 
			  			data = {label: ''};
			  		} else {
			  			data = JSON.parse(body);
			  		}

			  		res.render(rootDirectory+'/views/expert/answer.ejs', data);
			  	} else if (response.statusCode == 204){
			  		res.render(rootDirectory+'/views/expert/noQuestion.ejs');
			  	}
		  	}
		});
	})

	.put('/expert/questions/:id', function(req, res){
		var id = req.params.id,
			answer = req.body.answer;

		var dataToBeSend = {id: id, answer: answer, _method: 'put'};
		var options = {
		  	method: 'post',
		  	form: dataToBeSend,
		  	url: appPath+"/expert/questions/"+id
		};

		request(options, function (error, response, body) {
  			if (!error && response.statusCode == 200) {
  				var data = JSON.parse(body);
				res.render(rootDirectory + '/views/expert/question.ejs', data);
  			}
  		});
	})

	.get('/expert/questions/:id', function(req, res){
		var id = req.params.id;

		request(appPath+'/expert/questions/'+id, function (error, response, body) {
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
		res.redirect('/expert/questions/last');
	});
};