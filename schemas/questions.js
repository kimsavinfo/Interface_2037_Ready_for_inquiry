var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schemaQuestion = new Schema({
  	label : { type: String, default: '' },
  	answer : { type: String, default: '' },
  	publicationDate : { type: Number, default: new Date().getTime() },
  	status : { type: String, default: 'non-traité' }
});

mongoose.model('Question', schemaQuestion);