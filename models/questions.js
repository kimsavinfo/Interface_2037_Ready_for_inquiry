var mongoose = require('mongoose');

var host;
var model;
module.exports.host;
module.exports.model;

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
					console.log(question);
					callback(question);
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

	getUserQuestions: function(id, callback){
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
	}

};