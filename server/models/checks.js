var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
  "order":String,
  "newshop":String,
  "desc":String,
  "credit":Number,
  "applytime":String,
});

module.exports = mongoose.model('check', productSchema);
//此时根据name：Good,后缀加s-->Goods去数据库中查找此表
