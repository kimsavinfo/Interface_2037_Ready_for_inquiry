var mongoose = require('mongoose');

var host;
var model;
module.exports.host;
module.exports.model;

module.exports = {

	getLastQuestion: function(callback){
		callback({id: 1, libelle: 'Quel temps fait-il aujourd\'hui ?'});
	},

	add: function(oneQuestion, callback){
		mongoose.connect(this.host, function(err) {
	  		if (err) { throw err; }
	  		oneQuestion.save(function (err) {
		  		if (err) { throw err; }
		  		callback();
		  		mongoose.connection.close();
		  	});
		});
	},

	get: function(objectId, callback){
		_this = this;
		mongoose.connect(this.host, function(err) {
	  		if (err) { throw err; }
	  		_this.model.findById(objectId, function(err, question){
		  		if (err) { throw err; }
		  		callback(question);
		  		mongoose.connection.close();
		  	});
		});
	},

}