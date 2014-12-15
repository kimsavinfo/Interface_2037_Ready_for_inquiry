var rootDirectory = __dirname + '/..',
	test = require('unit.js'),
	modelQuestions = require(rootDirectory+'/models/questions');

describe.only('modelQuestions', function(){
	it('should return a question', function(done){

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
	});
});