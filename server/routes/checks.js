var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Bshop = require('../models/checks');
var Acces=require('../models/acces');

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
// router.get("/getAccess", function (req, res, next) {
 
//   let str={
//     name:req.query.name,
//     pwd:req.query.pwd
//   }
//  // console(req)
//   Acces.find(str,function(err,doc){
//     if(err){
//      res.json({
//        status: '1',
//        msg: err1.message,
//        result: ''
//      })
//     }else{
//         res.json({
//            status: '0',
//             msg:'',
//             result:{
//               list:doc
//             }
//         })
//     }
//   })
    
  
// });
router.get("/clearCheck", function (req, res, next) {

  // console(req.query.shopname);
  let str = {
    'order': req.query.order
  };
  Bshop.remove(str, function (err, res) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log("Res:" + res);
    }
  })

});
router.get("/addCheck", function (req, res, next) {

  // console(req.query.shopname);
  // let str = {
  //   'order': req.query.order
  // };
  // Bshop.remove(str, function (err, res) {
  //   if (err) {
  //     console.log("Error:" + err);
  //   } else {
  //     console.log("Res:" + res);
  //   }
  // })
   var newcheck = new Bshop({
     'shopname': req.query.shopname,
     'order': req.query.order,
     'desc': req.query.desc,
     'applytime':req.query.applytime,
   });
   newcheck.save(function (err, res) {
     if (err) {
       console.log("Error:" + err);
     } else {
       console.log("Res:" + res);
     }
   });


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
