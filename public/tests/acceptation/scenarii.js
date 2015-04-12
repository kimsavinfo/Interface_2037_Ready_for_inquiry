var rootDirectory = __dirname + '/../..',
	test = require('unit.js'),
	mongoose = require('mongoose'),
	json = JSON.parse,
	config = require(rootDirectory+'/config/config');

	var server = "http://localhost:5000";//require('../../app');
	var request = require('supertest');

describe('=== Scenarii ===', function(){

	var params = {};
	var questionScenarii = {};

	it("L usager pose une question au serveur et sait ou elle sera disponible", function(done)
	{
		console.log('\n\nQuand l usager pose une question au serveur');
		console.log('Alors le serveur indique qu il a enregistre la question');
		console.log('Et il permet a l usager de localiser la reponse lorsqu elle sera disponible');

		params = {
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
		console.log('\n\nEtant donne qu il existe une question en attente de reponse');
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

	it("L usager consulte la question mais elle n a pas encore de reponse", function(done)
	{
		console.log('\n\nEtant donne qu un usager a pose une question');
		console.log('Et aucun systeme expert n a pas encore traité la question');
		console.log('Quand l usager demande a consulter la reponse');
		console.log('Alors le serveur indique que la reponse n est pas encore disponible');

		request(server)
				.get('/expert/questions/'+questionScenarii.idBdD)
				.expect(200)
				.end(function (error, res) {
					if(error) {
						throw error;
					}

			
			var questionResult = json(res.text);
			test.should(res.body[0].answer).be.equal('');	

			console.log('- L usager visualise la question sans reponse.');
			done();
		});
	});

	it("Le systeme expert fournit une réponse", function(done)
	{
		console.log('\n\nEtant donne que le systeme expert a recupere une question en attente');
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
			questionScenarii.answer = questionResult[0].answer;
			console.log("- La reponse a bien ete enregistree et est disponible a l adresse :");
			test.should(questionResult[0].links[0].href).be.equal('/expert/questions/'+questionScenarii.idBdD);	

			done();
		});
	});

	it("L usager consulte la question et le systeme a bien respondu", function(done)
	{
		console.log('\n\nEtant donne qu un usager a pose une question');
		console.log('Et un systeme expert a traite la question');
		console.log('Quand l usager demande a consulter la reponse');
		console.log('Alors le serveur affiche la reponse du systeme expert');


		request(server)
				.get('/expert/questions/'+questionScenarii.idBdD)
				.expect(200)
				.end(function (error, res) {
					if(error) {
						throw error;
					}

			
			var questionResult = json(res.text);
			test.should(res.body[0].answer).be.equal(questionScenarii.answer);	

			console.log('- L usager visualise la question avec la reponse du systeme expert.');
			done();
		});
	});

	it("Le systeme expert indique qu il ne connait pas la response", function(done)
	{
		console.log('\n\nEtant donne que le systeme expert a recupere une question en attente');
		console.log('Et qu il a trouve une reponse');
		console.log('Quand il notifie le serveur de son echec');
		console.log('Alors le serveur enregistre que cette question n a pas de reponse connue.');

		params = {
			answer: "Désolé, nous ne connaissons pas la réponse."
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
			questionScenarii.answerInconnue = questionResult[0].answer;
			console.log("- La reponse a bien ete enregistree et est disponible a l adresse :");
			test.should(questionResult[0].links[0].href).be.equal('/expert/questions/'+questionScenarii.idBdD);	

			request(server)
				.get('/expert/questions/'+questionScenarii.idBdD)
				.expect(200)
				.end(function (error, res) {
					if(error) {
						throw error;
					}

				var questionResult = json(res.text);
				test.should(res.body[0].answer).be.equal(questionScenarii.answerInconnue);	

				console.log('- L usager visualise la question qui n a pu etre repondue par l expert');
				done();
			});
		});
	});

});