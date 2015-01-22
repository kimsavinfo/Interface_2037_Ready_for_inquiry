var mongoose = require('mongoose');

module.exports = {

	getLastQuestion: function(callback){
		callback({id: 1, libelle: 'Quel temps fait-il aujourd\'hui ?'});
	},

	add: function(oneQuestion, callback){
		
	}

}