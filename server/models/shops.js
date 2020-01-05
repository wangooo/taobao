var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
    "id": String,
    "shopname": String,
    "order": String,
    "desc": String,
    "createTime": String,
    "kind":String,
    "score":String,
    "fans":[
        {
            "id": String,
            "name": String,
            "score": String,
            "rate": String,
            "sex": String,
            "state": Boolean
        }
    ],
    "goods": [
        {
            "productId": String,
            "productName": String,
            "salePrice": Number,
            "productImage": String
        }]
});

module.exports = mongoose.model('shop', productSchema);
//此时根据name：Good,后缀加s-->Goods去数据库中查找此表
