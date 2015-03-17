var server = require('../../app');
var request = require('supertest');
var question = {};

describe('Server', function () {

	before(function () {
		server.listen(5001,function(){
			console.log('Serveur de tests d\'acceptation SERVEUR lancé');
		});
	});

	it('create a question', function(done) {
		var params = {
			label: "question-test"
		};
		request(server)
			.post('/client/questions')
			.expect(201)
			.send(params)
			.end(function (error, res) {
				if(error) {
					throw error;
				}
			done();
		});

	});

	it('list all questions', function(done) {
		request(server)
			.get('/client/questions/')
			.expect(200)
			.end(function (error, res) {
				if(error) {
					throw error;
				}
			question.id = res.body.questions[0]._id;
			done();
		});
	});

	it('find lastest questions', function(done) {

		request(server)
			.get('/expert/questions/')
			.expect(303)
			.end(function (error, res) {
				if(error) {
					throw error;
				}
			done();
		});

	});

	it('get a question by id', function(done) {

		request(server)
			.get('/expert/questions/'+question.id)
			.expect(200)
			.end(function (error, res) {
				if(error) {
					throw error;
				}
			done();
		});

	});

	it('update a question by id', function(done) {
		params = {
			answer: "reponse test"
		};
		request(server)
			.put('/expert/questions/'+question.id)
			.expect(200)
			.send(params)
			.end(function (error, res) {
				if(error) {
					throw error;
				}
			done();
		});
	});


	after(function () {
		server.close();
	});

});