var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
  "productId":String,
  "productName":String,
  "salePrice":Number,
  "productImage":String,
  "productNum": String
});

module.exports = mongoose.model('Good',productSchema);
//此时根据name：Good,后缀加s-->Goods去数据库中查找此表
