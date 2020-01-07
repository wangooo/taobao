var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Ashop = require('../models/shops');

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

router.get("/getMyShop", function (req, res, next) {
    let param = {
        order: req.query.order
    };
    Ashop.find(param).then(ress => {
        res.json({
            status: '0',
            msg: '',
            result: {
                list: ress
            }
        })
    })
});

router.get("/getAllShop", function (req, res, next) {
    Ashop.find({}).then(ress => {
        res.json({
            status: '0',
            msg: '',
            result: {
                list: ress
            }
        })
    })
});



    router.get("/getGoods", function (req, res, next) {
       // console.log('1111')
    let param = {
        id: req.query.id
    };
    Ashop.findOne({
        id: req.query.id
    }).then(ress => {
        res.json({
        status: '0',
        msg: '',
        result: {
            list: ress
        }
        })
    })
    });


router.get("/getShop", function (req, res, next) {
    //console.log('1111');
    Ashop.find({}).then(ress => {
        res.json({
              result: {
                list: ress
            }
        })
    })
});
router.get("/clearShop",function(req,res,next){
    
   // console(req.query.shopname);
   let str={'shopname':req.query.shopname};
   Ashop.remove(str, function (err, res) {
     if (err) {
       console.log("Error:" + err);
     } else {
       console.log("Res:" + res);
     }
   })
   
});
router.get("/AddShop", function (req, res, next) {

    // console(req.query.shopname);
    // let str = { 'shopname': req.query.shopname };
    // Ashop.remove(str, function (err, res) {
    //     if (err) {
    //         console.log("Error:" + err);
    //     } else {
    //         console.log("Res:" + res);
    //     }
    // })
    var shop = new Ashop({
        'shopname':req.query.shopname,
        'order':req.query.order,
        'desc':req.query.desc
    });
    shop.save(function(err,res){
         if (err) {
           console.log("Error:" + err);
         } else {
           console.log("Res:" + res);
         }
    });


})

router.get("/addShop", function (req, res, next) {
    // let id = req.query.id;
    let params = req.query;

    console.log(params.shopname);
    let newShop = new Ashop({
        "id":"4",
        "shopname": params.shopname,
        "order": params.order,
        "desc": params.desc,
        "createTime": "20201020",
        "kind": "life",
        "score": "80",
        "pic": "1.jpg",
        "shopImg": "/static/4.jpg",
        "fans":[],
        "goods":[]
    })
    newShop.save().then((ress,req)=>{
        if(res){
            console.log('sss'+ress);
            res.json({
                status: '0',
                msg: '',
                result: {
                    list: ress
                }
            })
        }
    })
// })
});

module.exports = router;
