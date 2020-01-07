var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');
var Auser = require('../models/users');

//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/shop',{useNewUrlParser:true});

mongoose.connection.on("connected",function(){
  console.log("连接数据库成功");
});

mongoose.connection.on("error",function(){
  console.log("连接数据库失败");
});

mongoose.connection.on("disconnected",function(){
  console.log("disconnected")
})

router.post("/login",function(req,res,next){
  // console.log("000");
  var param={
    userName:req.body.tuserName,
    userPwd:req.body.tuserPwd
  };
  Auser.findOne(param,function(err,doc){
    // console.log("111");
    if(err){
      res.json({
        status:'1',
        msg:"错啦",
        result:''
      })
    }
    else{
      if(doc){
        res.cookie("userId",doc.userId,{
          path:'/',
          maxAge:1000*60*60
        });
        res.cookie("userName",doc.userName,{
          path:'/',
          maxAge:1000*60*60
        });
        // req.session.user=doc;
        res.json({
          status:'0',
          msg:'',
          result:{
            userName:doc.userName,
          }
        })
      }
      else{
        res.json({
          status:'1',
          msg:'errorr',
          result:''
        })
      }
    }
  })
});

router.get('/logout',function(req,res,next){
  res.cookie("userId","",{
    path:'/',
    maxAge:-1
  });
  res.cookie("userName","",{
    path:'/',
    maxAge:-1
  });
  res.json({
    status:'0',
    msg:'',
    result:''
  })
})

/* GET home page. */
router.get('/list', function(req, res, next) {

  let page=parseInt(req.query.page);
  let pageSize=parseInt(req.query.pageSize);
  let sort=parseInt(req.query.sort);
  let skip=(page-1)*pageSize;
  let priceChecked=req.query.priceChecked;
  let params={};
  let low='';
  let high='';
  if(priceChecked!='all'){
    switch (priceChecked) {
      case '0':low=0;high=50;break;
      case '1':low=50;high=500;break;
      case '2':low=500;high=1000;break;
      case '3':low=1000;high=10000;break;
    }
    params={
      salePrice: {
        $gt:low,
        $lte:high
      }
    }
  }
  // console.log("我命好苦啊");
  let goodsModel=Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice':sort});
  goodsModel.exec(function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message()
      });
    }
    else{
      res.json({
        status:'0',
        msg:'',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
});

router.post('/addCart',function(req,res,next){
  console.log('oneoneone');
  var productId=req.body.productId;
  var userId='001';
  // var User = require('../models/user');
  Auser.findOne({ 'userId': userId }, function(err,userDoc){

    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }
    else{
      if(userDoc){
        var goodsItem='';
        userDoc.cardList.forEach(function(item){
          if(item.productId == productId){
            goodsItem=item;
            item.productNum++;
          }
        });
        if(goodsItem){
          userDoc.save(function (err2, doc2) {
            if (err2) {
              res.json({
                status: '1',
                msg: err2.message,
                result:''
              })
            } else {
              res.json({
                status: '0',
                msg: '',
                result: 'suc'
              })
            }
          })
        }
        else{
          Goods.findOne({productId:productId},function(err1,doc){
            if(err1){
              res.json({
                status:'1',
                msg:err1.message,
                result:''
              })
            }
            else{
              if(doc) {
                doc.productNum = 1;
                doc.checked = 1;
                userDoc.cardList.push(doc);
                userDoc.save(function (err2, doc2) {
                  if (err2) {
                    res.json({
                      status: '1',
                      msg: err2.message
                    })
                  } else {
                    res.json({
                      status: '0',
                      msg: '',
                      result: 'suc'
                    })
                  }
                })
              }
            }
          })
        }
      }
      else{
        console.log('twotwotwo');
        res.json({
          status:'1',
          msg:err.message,
          result:''
        })
      }
    }
  })
});

router.get('/checkLogin',function(req,res,next){
  if(req.cookies.userId){
    res.json({
      status:'0',
      msg:'',
      result:{
        userId:req.cookies.userId,
        userName:req.cookies.userName
      }
    })
  }
});

router.get('/cardList',function(req,res,next){
  if(req.cookies.userId){
    let cook=req.cookies.userId;
    Auser.findOne({userId:cook},function(err,doc){
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        })
      }
      else{
        if(doc){
          res.json({
            status:'0',
            msg:'',
            result:{
              theCardList:doc.cardList
            }
          })
        }
        else{
          res.json({
            status:'1',
            msg:err.message,
            result:''
          })
        }
      }
    })
  }
});

router.post('/subt',function(req,res,next){
  let productIndex=req.body.productCount;
  console.log("aaa is "+productIndex);
  let cook=req.cookies.userId;
  Auser.findOne({userId:cook},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }
    else{
      if(doc){
        console.log("bbb is "+doc.cardList[productIndex]);
        let yo=parseInt(doc.cardList[productIndex].productNum);
        doc.cardList[productIndex].productNum=yo-1;
        console.log("pN is "+doc.cardList[productIndex].productNum);
        doc.save(function (err2, doc2) {
          if (err2) {
            res.json({
              status: '1',
              msg: err2.message,
              result:''
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: 'suc'
            })
          }
        })
      }
      else{
        res.json({
          status:'1',
          msg:err.message,
          result:''
        })
      }
    }
  })
});

router.post('/add',function(req,res,next){
  let productIndex=req.body.productCount;
  console.log("aaa is "+productIndex);
  let cook=req.cookies.userId;
  Auser.findOne({userId:cook},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }
    else{
      if(doc){
        console.log("bbb is "+doc.cardList[productIndex]);
        let yo=parseInt(doc.cardList[productIndex].productNum);
        doc.cardList[productIndex].productNum=yo+1;
        console.log("pN is "+doc.cardList[productIndex].productNum);
        doc.save(function (err2, doc2) {
          if (err2) {
            res.json({
              status: '1',
              msg: err2.message,
              result:''
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: 'suc'
            })
          }
        })
      }
      else{
        res.json({
          status:'1',
          msg:err.message,
          result:''
        })
      }
    }
  })
});

router.post('/deleteProduct',function(req,res,next){
  let productIndex=req.body.productIndex;
  console.log("aaa is "+productIndex);
  let cook=req.cookies.userId;
  Auser.findOne({userId:cook},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }
    else{
      if(doc){
        console.log("bbb is "+doc.cardList[productIndex]);
        console.log("pN is "+doc.cardList[productIndex].productNum);
        doc.cardList.splice(productIndex,1);
        doc.save(function (err2, doc2) {
          if (err2) {
            res.json({
              status: '1',
              msg: err2.message,
              result:''
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: 'suc'
            })
          }
        })
      }
      else{
        res.json({
          status:'1',
          msg:err.message,
          result:''
        })
      }
    }
  })
})

router.post('/checkProduct',function(req,res,next){
  let productIndex=req.body.productIndex;
  console.log("aaa is "+productIndex);
  let cook=req.cookies.userId;
  Auser.findOne({userId:cook},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }
    else{
      if(doc){
        doc.cardList[productIndex].checked= !doc.cardList[productIndex].checked;
        doc.save(function (err2, doc2) {
          if (err2) {
            res.json({
              status: '1',
              msg: err2.message,
              result:''
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: 'suc'
            })
          }
        })
      }
      else{
        res.json({
          status:'1',
          msg:err.message,
          result:''
        })
      }
    }
  })
})

router.post('/tryy',function(req,res,next){
  let tryId=req.body.tryId;
  if(tryId=='oo'){
    res.json({
      status: '0',
      msg: '',
      result: {
        name:'wsy',
        age:12
      }
    })
  }
  else{
    res.json({
      status: '0',
      msg: '',
      result: {
        name:'上官文杰',
        age:18
      }
    })
  }
})

module.exports = router;
