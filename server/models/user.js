var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  "userId": String,
  "userName": String,
  "userPwd": String,
  "job": String,
  "type": String
})

module.exports = mongoose.model('user', userSchema, 'user');
