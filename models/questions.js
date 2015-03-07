var mongoose = require('mongoose');

var host = module.exports.host;
var model = module.exports.model;

module.exports = {

	getLastQuestion: function(callback){
		_this = this;
		mongoose.connect(this.host, function(err) {
			if (err) { throw err; }
			_this.model.findOneAndUpdate(
				{status:'non-traité'}, 
				{status:"en-traitement"}, 
				{sort:'publicationDate'},
				function(err, question){
					if (err) { throw err; }
					mongoose.connection.close();
					callback(question);
			});
	 	});
	},

	getLastQuestions: function(callback){
		_this = this;
		mongoose.connect(this.host, function(err) {
			if (err) { throw err; }
			_this.model.find(
				{status:'non-traité'}, 
				{status:"en-traitement"}, 
				{sort:'publicationDate'},
				function(err, questions){
					if (err) { throw err; }
					mongoose.connection.close();
					callback(questions);
			});
	 	});
	},

	add: function(oneQuestion, callback){
		mongoose.connect(this.host, function(err) {
	  		if (err) { throw err; }
	  		oneQuestion.save(function (err, question) {
		  		if (err) { throw err; }
		  		mongoose.connection.close();
		  		callback(question);
		  	});
		});
	},

	get: function(id, callback){
		_this = this;
		mongoose.connect(this.host, function(err) {
			if (err) { throw err; }
			_this.model.findById(id, function(err, question){
				if (err) { throw err; }
				mongoose.connection.close();
				callback(question);
			});
		});
	},

	getQuestionsUser: function(user_id, callback){
		_this = this;
		mongoose.connect(this.host, function(err) {
			if (err) { throw err; }
			_this.model.find(
				{user_id: user_id}, 
				function(err, userQuestions){
				if (err) { throw err; }
				mongoose.connection.close();
				callback(userQuestions);
			});
		});
	},

	update: function(id, answer, status, callback){
		_this = this;
		mongoose.connect(this.host, function(err) {
	  		if (err) { throw err; }
	  		_this.model.findByIdAndUpdate({ _id: id }, {answer: answer, status: status}, {multi: false}, function(err, question){
		  		if (err) { throw err; }
		  		mongoose.connection.close();
		  		callback(question);
		  	});
		});
	},

	delete: function(id, callback){
		_this = this;
		mongoose.connect(this.host, function(err) {
			if (err) { throw err; }
			_this.model.remove({ _id: id}, function(err){
				if (err) { throw err; }
				mongoose.connection.close();
				callback();
			});
		});
	},

	deleteAll: function(callback){
		_this = this;
		mongoose.connect(this.host, function(err) {
			if (err) { throw err; }
			_this.model.remove({}, function(err){
				if (err) { throw err; }
				mongoose.connection.close();
				callback();
			});
		});
	}
};