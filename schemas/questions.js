var mongoose = require('mongoose');

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var schemaQuestion = new Schema({
  	label : String,
  	answer : String,
  	publicationDate : Date,
  	state : String
});

Question = mongoose.model('Questions', schemaQuestion);

exports.modelQuestion = Question;