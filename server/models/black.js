var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
  "id": String,
  "name": String,
  "score": String,
  "rate": String,
  "sex": String,
  "state": Boolean
});

module.exports = mongoose.model('black', productSchema);
//此时根据name：Good,后缀加s-->Goods去数据库中查找此表
