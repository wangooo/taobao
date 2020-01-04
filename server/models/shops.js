var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
    "name": String,
    "order": String,
    "shopId": String,
    "starttime": String,
    "age": Number
});

module.exports = mongoose.model('Shop', productSchema);
//此时根据name：Good,后缀加s-->Goods去数据库中查找此表
