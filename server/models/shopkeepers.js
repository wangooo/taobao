var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
  
  "name": String,
  "nshop": Number,
  "city": String,
  "adress": String
})

module.exports = mongoose.model('shopkeeper', userSchema);
