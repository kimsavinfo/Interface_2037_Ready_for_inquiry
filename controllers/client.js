module.exports = function(app){
	var rootDirectory = __dirname + '/..',
		mongoose = require('mongoose');
		//schemaQuestion = require(rootDirectory+'/schemas/questions'),
		modelQuestion = require(rootDirectory+'/models/questions');


	var Schema = mongoose.Schema;

	var schemaQuestion = new Schema({
	  	label : { type: String, default: '' },
	  	answer : { type: String, default: '' },
	  	publicationDate : { type: Date, default: new Date() },
	  	state : { type: String, default: '' }
	});

	QuestionsModel = mongoose.model('Questions', schemaQuestion);

	app.get('/client/questions', function(req, res){
		res.render(rootDirectory + '/views/addQuestion.ejs');
	})

	.post('/client/questions', function(req, res){
		oneQuestion = new QuestionsModel({label: req.body.label});
		mongoose.connect('mongodb://localhost/interface2037', function(err) {
	  		if (err) { throw err; }
	  		oneQuestion.save(function (err) {
		  		if (err) { throw err; }
		  		console.log('Nikel');
		  		mongoose.connection.close();
		  	});
		});
	})
};