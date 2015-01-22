var mongoose = require('mongoose');

var host;
module.exports.host;
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
	}

}