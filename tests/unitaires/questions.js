var rootDirectory = __dirname + '/../..',
	test = require('unit.js'),
	mongoose = require('mongoose'),
	config = require(rootDirectory+'/config/config'),
	schemaQuestion = require(rootDirectory+'/schemas/questions'),
	modelQuestion = require(rootDirectory+'/models/questions');

	var ModelQuestionDb = mongoose.model('Question');
	modelQuestion.host = config.db.host;
	modelQuestion.model = ModelQuestionDb;

describe.only('modelQuestions', function(){

	it('should create a question', function(done){
		var question = new ModelQuestionDb({label: 'Question pour test unitaire'});

		modelQuestion.add(question, function(questionTest){
			test.value(questionTest.id).isNumber();
		});

		done();
	});

	/*it('should return a question', function(done){

		modelQuestions.getLastQuestion(function(question){
			test
			  	.object(question)
			  	.matchEach(function(it, key) {
			    
			      	if(key == 'id'){
			        	return (typeof it == 'number');
			      	} else if (key == 'libelle') {
			      		return (typeof it == 'string');
			      	}
			    });
		});

		done();
	});*/
});