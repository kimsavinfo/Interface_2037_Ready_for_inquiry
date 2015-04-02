var rootDirectory = __dirname + '/../..',
	test = require('unit.js'),
	mongoose = require('mongoose'),
	config = require(rootDirectory+'/config/config'),
	schemaQuestion = require(rootDirectory+'/schemas/questions'),
	modelQuestion = require(rootDirectory+'/models/questions'),
	libString = require(rootDirectory+'/models/libString');

	var ModelQuestionDb = mongoose.model('Question');
		modelQuestion.host = config.dbTest.host;
		modelQuestion.model = ModelQuestionDb;

	var server = require('../../app');
	var request = require('supertest');
	var question = {};

describe('Scenarii', function(){

	before(function () {
		server.listen(5002,function(){
			console.log('Serveur de tests d acceptation Scenarii lance');
		});
	});

	it("Aucune question", function(done)
	{
		console.log('Etant donne qu il n existe aucune question');
		console.log('Quand le systeme expert demande la prochaine question au serveur');
		console.log('Alors le serveur indique qu il n existe pas de question');
		console.log('Et le systeme expert se met veille avant de redemander une question');

		modelQuestion.deleteAll(function(){
			console.log("Il n existe aucune question");

			request(server)
				.get('/expert/questions/last')
				.expect(204)
				.end(function (error, res) {
					if(error) {
						throw error;
					}
				done();
			});
		});
	});

	after(function () {
		server.close();
	});

});