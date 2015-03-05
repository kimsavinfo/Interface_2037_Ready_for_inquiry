var rootDirectory = __dirname + '/../..',
	test = require('unit.js'),
	mongoose = require('mongoose'),
	config = require(rootDirectory+'/config/config'),
	schemaQuestion = require(rootDirectory+'/schemas/questions'),
	modelQuestion = require(rootDirectory+'/models/questions'),
	schemaUser = require(rootDirectory+'/schemas/users'),
	modelUser = require(rootDirectory+'/models/users'),
	libString = require(rootDirectory+'/models/libString');

	var ModelQuestionDb = mongoose.model('Question');
		modelQuestion.host = config.dbTest.host;
		modelQuestion.model = ModelQuestionDb;
		ModelUserDb = mongoose.model('User');
		modelUser.host = config.db.host;
		modelUser.model = ModelUserDb;
	var user;

describe.only('modelQuestions', function(){

	var question = new ModelQuestionDb({label: 'Question pour test unitaire'});
	var newStatus = 'traité';
	var newAnswer = 'reponse d\'une question pour test unitaire';

	before('S assurer que testUser@gmail.com soit dans la base', function(done){
		// Delete all questions
		modelQuestion.deleteAll(function(){
			console.log("BEFORE : All questions have been removed");
			// Create user test
			var emailClean = "testUser@gmail.com";
			var passwordClean = "test";
			modelUser.getUserConnection(emailClean, passwordClean, function(userFound){
				user = userFound;
				if (!userFound) 
				{
					var oneUser = new ModelUserDb({email: emailClean, password: passwordClean});
					modelUser.add(oneUser, function(userCreated){
						user = userCreated;
						done();
					});
				}
				else
				{
					done();
				}			
			});
		});
	});

	// Expert doesn't have any question to answer to
	it('should show to the Expert there is no question to answer to', function(done){
		modelQuestion.getLastQuestion(function(lastQuestion){
			if(lastQuestion){
				test.value(1).isEqualTo(0);
			} else {
				test.value(1).isEqualTo(1);
			}
			done();
		});
	});

	// User ask a question
	it('should create a question', function(done){
		modelQuestion.add(question, function(questionTest){
			test.value(questionTest.id).isString();
			question = questionTest;
			done();
		});
	});

	// User consult the question, the answer is not available
	it('should get the question', function(done){
		modelQuestion.get(question.id, function(questionTest){
			test.value(question.id).isEqualTo(questionTest.id);
			test.value(question.label).isEqualTo(questionTest.label);
			test.value(question.publicationDate).isEqualTo(questionTest.publicationDate);
			test.value(questionTest.answer).isEqualTo('');
			test.value(questionTest.status).isEqualTo('non-traité');
			done();
		});
	});

	// Expert answer the question
	// It's the same method with the "Je passe" : expert doesn't know the answer
	it('should update the question', function(done){
		modelQuestion.update(question.id, newAnswer, newStatus, function(questionUpdated){
			modelQuestion.get(questionUpdated.id, function(questionTest){
				test.value(newAnswer).isEqualTo(questionTest.answer);
				test.value(newStatus).isEqualTo(questionTest.status);
				done();
			});
		});
	});

	// User consult the question, the answer is available
	it('should show the available answer', function(done){
		modelQuestion.get(question.id, function(questionTest){
			test.value(questionTest.answer).isEqualTo(newAnswer);
			test.value(questionTest.status).isEqualTo(newStatus);
			done();
		});
	});

	// User delete a question
	it('should delete the question', function(done){
		modelQuestion.delete(question.id, function(){
			modelQuestion.get(question.id, function(questionTest){
				test.value(questionTest).isNull();
				done();
			});
		});
	});

});