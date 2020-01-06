var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Bshop = require('../models/checks');

//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/taobao', {
  useNewUrlParser: true
});

mongoose.connection.on("connected", function () {
  console.log("连接数据库成功");
});

mongoose.connection.on("error", function () {
  console.log("连接数据库失败");
});

mongoose.connection.on("disconnected", function () {
  console.log("disconnected")
});

router.get("/getNewShop",function(req,res,next){
    Bshop.find({}).then(ress=>{
        res.json({
              order: '',
              desc: '',
              credit: '',
              applytime: '',
              newShop: '',
              result:{
                  list:ress
              }
        })
    })
});
router.get("/test", function (req, res, next) {
  res.json({
    status: '0',
    msg: '',
    result: {
      state: 'ok'
    }
  })
});

module.exports = router;
