var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');
var Auser = require('../models/users');

//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/taobao', { useNewUrlParser: true });

mongoose.connection.on("connected", function () {
  console.log("连接数据库成功");
});

mongoose.connection.on("error", function () {
  console.log("连接数据库失败");
});

mongoose.connection.on("disconnected", function () {
  console.log("disconnected")
});

console.log("-1");

router.post("/login", function (req, res, next) {
  console.log("000");
  var param = {
    userName: req.body.tuserName,
    userPwd: req.body.tuserPwd
  };
  Auser.findOne(param, function (err, doc) {
    console.log("111");
    if (err) {
      res.json({
        status: '1',
        msg: "错啦"
      })
    }
    else {
      if (doc) {
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        // req.session.user=doc;
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        })
      }
    }
  })
});

router.get("/checkLogin", function (req, res, next) {
  console.log("000");
  var param = {
    name: req.body.name,
    pwd: req.body.pwd
  };
  Auser.findOne(param, function (err, doc) {
    console.log("111");
    if (err) {
      res.json({
        status: '1',
        msg: "错啦"
      })
    }
    else {
      if (doc) {
        // req.session.user=doc;
        res.json({
          status: '0',
          msg: '',
          result: {
            state: 'ok'
          }
        })
      }
    }
  })
});
router.get("/getUser", function (req, res, next) {
  //console.log('1111');
  Auser.find({}).then(ress => {
      res.json({
                name:'',
                age:'',
                province:'',
                city:'',
                adress:'',
          result: {
              list: ress
          }
      })
  })
});

router.get("/clearuser",function(req,res,next){
    
  // console(req.query.shopname);
  let str={'name':req.query.name};
  Auser.remove(str, function (err, res) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log("Res:" + res);
    }
  })
  
});
// router.get("/getUser",function(req,res,next){
//   Auser.find({}).then(ress=>{
//       console.log(ress);
//       res.json({
         
//           name:'',
//           age:'',
//           province:'',
//           city:'',
//           adress:'',
//           result:{
//               list: ress
//           }
//       })
//   })
// });
module.exports = router;
