var mongoose = require('mongoose');

module.exports = {

	getLastQuestion: function(callback){
		callback({id: 1, libelle: 'Quel temps fait-il aujourd\'hui ?'});
	},

	add: function(oneQuestion, callback){
		mongoose.connect('mongodb://localhost/interface2037', function(err) {
	  		if (err) { throw err; }
	  		oneQuestion.save(function (err) {
		  		if (err) { throw err; }
		  		callback();
		  		mongoose.connection.close();
		  	});
		});
	}

}