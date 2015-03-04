var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schemaUser = new Schema({
  	email : { type: String, default: '' },
  	password : { type: String, default: '' },
  	created : { type: Number, default: new Date().getTime() },
  	status : { type: String, default: 'active' }
});

mongoose.model('User', schemaUser);