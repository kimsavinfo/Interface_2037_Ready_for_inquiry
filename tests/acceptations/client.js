var server = require('../../app');
var request = require('supertest');
var question = {};

describe('Client', function () {

	before(function () {
		server.listen(5002,function(){
			console.log('Serveur de tests d\'acceptation CLIENT lancé');
		});
	});

	it('create a question', function(done) {
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

	it('find questions by label', function(done) {
		var params = {
			label: "test"
		};
		request(server)
			.get('/client/questions')
			.expect(200)
			.send(params)
			.end(function (error, res) {
				if(error) {
					throw error;
				}
			done();
		});

	});

	it('find question by id', function(done) {

		request(server)
			.get('/client/questions/'+question.id)
			.expect(200)
			.end(function (error, res) {
				if(error) {
					throw error;
				}
			done();
		});

	});

	it('delete question by id', function(done) {

		request(server)
			.delete('/client/questions/'+question.id)
			.expect(204)
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