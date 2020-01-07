var mongoose = require('mongoose');
var Schema = mongoose.Schema
var userSchema = new Schema({
  "iden":String,
  "pwd":String,
  "name": String,
  "age":Number,
  "province": String,
  "city": String,
  "adress": String
})

module.exports = mongoose.model('user', userSchema);
