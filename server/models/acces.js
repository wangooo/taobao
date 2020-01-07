var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
  "order": String,
  "name":String,
  "pwd":String,
  "limit":Number
});

module.exports = mongoose.model('acce', productSchema);
//此时根据name：Good,后缀加s-->Goods去数据库中查找此表
