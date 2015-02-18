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

	var question = new ModelQuestionDb({label: 'Question pour test unitaire'});

	it('should create a question', function(done){

		modelQuestion.add(question, function(questionTest){
			test.value(questionTest.id).isString();
			question = questionTest;
			done();
		});

	});

	it('should get the question', function(done){

		modelQuestion.get(question.id, function(questionTest){
			test.value(question.id).isEqualTo(questionTest.id);
			test.value(question.label).isEqualTo(questionTest.label);
			test.value(question.publicationDate).isEqualTo(questionTest.publicationDate);
			test.value(question.answer).isEqualTo(questionTest.answer);
			test.value(question.status).isEqualTo(questionTest.status);
			done();
		});

	});

	it('should update the question', function(done){

		newStatus = 'traité';
		newAnswer = 'reponse d\'une question pour test unitaire';

		modelQuestion.update(question.id, newAnswer, newStatus, function(questionUpdated){
			modelQuestion.get(questionUpdated.id, function(questionTest){
				test.value(newAnswer).isEqualTo(questionTest.answer);
				test.value(newStatus).isEqualTo(questionTest.status);
				done();
			});
		});

	});

	it('should delete the question', function(done){
		modelQuestion.delete(question.id, function(){
			modelQuestion.get(question.id, function(questionTest){
				test.value(questionTest).isNull();
				done();
			});
		});
	});

});