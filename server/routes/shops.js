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
    Ashop.find({ order: "wsy" }).then(ress => {
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
    console.log('1111');
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

router.get("/addShop", function (req, res, next) {
    let id = req.query.id;
    let form = req.query.form;
    Ashop.findOne({ id }, function (err1, theShop) {
        if (err1) {
            res.json({
                status: '1',
                msg: err1.message,
                result: ''
            })
        }
        else {
            if (theShop) {
                theShop.goods.push(form);
                theShop.update((err,doc)=>{
                    if(err){
                        res.json({
                            status: '0',
                            msg: '',
                            result: 'no'
                          })
                    }
                    else{
                        console.log(doc)
                        res.json({
                            status: '0',
                            msg: '',
                            result: 'suc'
                          })
                    }
                })
                // userDoc.save(function (err2, doc2) {
                //     if (err2) {
                //         res.json({
                //             status: '1',
                //             msg: err2.message
                //         })
                //     } else {
                //         res.json({
                //             status: '0',
                //             msg: '',
                //             result: 'suc'
                //         })
                //     }
                // })
            }
        }
    })
// })
});

module.exports = router;
