var rootDirectory = __dirname + '/../..',
	test = require('unit.js'),
	mongoose = require('mongoose'),
	json = JSON.parse,
	config = require(rootDirectory+'/config/config'),
	schemaQuestion = require(rootDirectory+'/schemas/questions'),
	modelQuestion = require(rootDirectory+'/models/questions'),
	libString = require(rootDirectory+'/models/libString');

	var ModelQuestionDb = mongoose.model('Question');
		modelQuestion.host = config.dbTest.host;
		modelQuestion.model = ModelQuestionDb;

	var server = require('../../app');
	var request = require('supertest');

describe('=== Scenarii ===', function(){

	var questionScenarii = new ModelQuestionDb({label: 'Question pour test scenarii'});

	before(function () {
		server.listen(5002,function(){
			console.log('Serveur de tests d acceptation Scenarii lance');
		});
	});

	it("Aucune question pour le systeme expert", function(done)
	{
		console.log('Etant donne qu il n existe aucune question');
		console.log('Quand le systeme expert demande la prochaine question au serveur');
		console.log('Alors le serveur indique qu il n existe pas de question');
		console.log('Et le systeme expert se met veille avant de redemander une question');

		modelQuestion.deleteAll(function(){
			console.log("- Il n existe aucune question en base");

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

	it("L usager pose une question au serveur et sait ou elle sera disponible", function(done)
	{
		console.log('Quand l usager pose une question au serveur');
		console.log('Alors le serveur indique qu il a enregistre la question');
		console.log('Et il permet a l usager de localiser la reponse lorsqu elle sera disponible');

		var params = {
			label: "question-test"
		};

		request(server)
			.post('/client/questions')
			.type('form')
			.expect(201)
			.send(params)
			.end(function (error, res) {
				if(error) {
					throw error;
				}
			
			console.log('- L usager a pose une question au serveur');
			var href = res.headers.location;
			questionScenarii.href = href;
			questionScenarii.idBdD = href.substring(href.lastIndexOf('/')+1, href.length);

			console.log('- Elle sera disponible a l adresse : '+questionScenarii.href);
			test.should(questionScenarii.href).be.equal('/client/questions/'+questionScenarii.idBdD);

			done();
		});
	});

	it("Le systeme expert propose la question en attente", function(done)
	{
		console.log('Etant donne qu il existe une question en attente de reponse');
		console.log('Quand le systeme expert demande la prochaine question au serveur'); 
		console.log('Alors il recupere la question en attente');
		console.log('Et la question suivante devient la question en attente');

		request(server)
			.post('/client/questions')
			.type('form')
			.expect(201)
			.send(params)
			.end(function (error, res) {
				if(error) {
					throw error;
				}

				console.log('- L usager a pose une seconde question au serveur');
				var href = res.headers.location;
				question2_idBdD = href.substring(href.lastIndexOf('/')+1, href.length);

				request(server)
				.get('/expert/questions/last')
				.expect(303)
				.end(function (error, res) {
					if(error) {
						throw error;
					}

				var redirection = res.headers.location;

				request(server)
					.get(redirection)
					.expect(200)
					.end(function (error, res) {
						if(error) {
							throw error;
						}

					console.log('- L experter recupere la premiere question posee et la seconde passe en attente');
					test.should(res.body[0]._id).be.equal(questionScenarii.idBdD);	

					done();
				});
			});
		});
	});

	it("Le systeme expert fournit une réponse", function(done)
	{
		console.log('Etant donne que le systeme expert a recupere une question en attente');
		console.log('Et qu il a trouve une reponse');
		console.log('Quand il fournit la reponse au serveur');
		console.log('Alors le serveur indique qu il a enregistre la reponse a la question');

		params = {
			answer: "reponse d\'une question pour test scenarii"
		};
		request(server)
			.put('/expert/questions/'+questionScenarii.idBdD)
			.type('form')
			.expect(200)
			.send(params)
			.end(function (error, res) {
				if(error) {
					throw error;
				}

			var questionResult = json(res.text);
			console.log("- La reponse a bien ete enregistree et est disponible a l adresse :");
			test.should(questionResult[0].links[0].href).be.equal('/expert/questions/'+questionScenarii.idBdD);	

			done();
		});
	});

	after(function () {
		server.close();
	});

});