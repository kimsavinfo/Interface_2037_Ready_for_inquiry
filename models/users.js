var mongoose = require('mongoose');

var host;
var model;
module.exports.host;
module.exports.model;

module.exports = {

	add: function(oneUser, callback){
		mongoose.connect(this.host, function(err) {
	  		if (err) { throw err; }
	  		oneUser.save(function (err, user) {
		  		if (err) { throw err; }
		  		mongoose.connection.close();
		  		callback(user);
		  	});
		});
	},

	get: function(id, callback){
		_this = this;
		mongoose.connect(this.host, function(err) {
			if (err) { throw err; }
			_this.model.findById(id, function(err, user){
				if (err) { throw err; }
				mongoose.connection.close();
				callback(user);
			});
		});
	},

	getUserConnection: function(email, password, callback) {
		_this = this;
		mongoose.connect(this.host, function(err, result) {
			if (err) { throw err; }
			_this.model.findOne(
				{email: email, password: password}, 
				function(err, user){
				if (err) { throw err; }
				mongoose.connection.close();
				callback(user);
			});
		});
	}

};