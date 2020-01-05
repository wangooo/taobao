var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  "_id": String,
  "age":Number,
  "name": String,
  "province": String,
  "city": String,
  "adress": String
})

module.exports = mongoose.model('user', userSchema, 'user');
