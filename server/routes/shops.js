var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Ashop = require('../models/shops');
//var Agood=require('../models/goods')

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
router.get("/clearShop", function (req, res, next) {

    // console(req.query.shopname);
    let str = { 'shopname': req.query.shopname };
    Ashop.remove(str, function (err, res) {
        if (err) {
            console.log("Error:" + err);
        } else {
            console.log("Res:" + res);
        }
    })

});

router.get("/getEditItem", function (req, res, next) {
    Ashop.findOne({ shopname: req.query.shopname }, ((err, doc) => {
        if (doc) {
            let id = req.query.productId;
            var product;
            doc.goods.forEach(item => {
                if (item.productId == id) {
                    product = item;
                }
            })
            console.log(product)
            res.json({
                result: {
                    obj: product
                }
            })
        }
    }))
});

router.get("/getEditShop", function (req, res, next) {
    Ashop.findOne({ shopname: req.query.shopname }, ((err, doc) => {
        if (doc) {
            res.json({
                result: {
                    obj: doc
                }
            })
        }
    }))
});

router.get("/AddShop", function (req, res, next) {
    var shop = new Ashop({
        'shopname': req.query.shopname,
        'order': req.query.order,
        'desc': req.query.desc,
        'pic': "8.jpg",
    });
    shop.save(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        } else {
            console.log("Res:" + res);
        }
    });
})

router.get("/editShop", function (req, res, next) {
    Ashop.findOne({ id: req.query.id }).then(ress => {
        if (ress) {
            ress.shopname = req.query.shopname;
            ress.desc = req.query.desc;
            ress.order = req.query.order;
            ress.createTime = req.query.applyTime;
            ress.save().then(suc=>{
                if(suc){
                    res.json({
                        state:'ok'
                    })
                }
            });
        }
    })

})

// router.get("/addShop", function (req, res, next) {
//     // let id = req.query.id;
//     let params = req.query;

//     console.log(params.shopname);
//     let newShop = new Ashop({
//         "id":"4",
//         "shopname": params.shopname,
//         "order": params.order,
//         "desc": params.desc,
//         "createTime": "20201020",
//         "kind": "life",
//         "score": "80",
//         "pic": "1.jpg",
//         "shopImg": "/static/4.jpg",
//         "fans":[],
//         "goods":[]
//     })
//     newShop.save().then((ress,req)=>{
//         if(res){
//             console.log('sss'+ress);
//             res.json({
//                 status: '0',
//                 msg: '',
//                 result: {
//                     list: ress
//                 }
//             })
//         }
//     })
// // })
// });

router.get("/changeGoodStatus", (req, res, next) => {
    Ashop.findOne({ "shopname": req.query.shopname }).then(ress => {
        if (ress) {
            // console.log(ress);
            ress.goods.forEach(item => {
                if (item.productId == req.query.id) {
                    console.log(req.query.state);
                    if (req.query.state == false) {
                        item.state = true
                    }
                    else item.state = false;
                }
            })
            ress.save().then(suc => {
                if (suc) {
                    res.json({
                        state: 'ok'
                    })
                }
            });
        }
        else console.log('error')
    })


})




router.get("/editGood", function (req, res, next) {
    console.log(req.query.shopname)
    Ashop.findOne({ "shopname": req.query.shopname }).then((reso, err) => {
        if (reso) {
            reso.goods.forEach(item => {
                if (item.productId == req.query.id) {
                    item.productName = req.query.name;
                    item.salePrice = req.query.price;
                }
            })
            reso.save().then(suc => {
                if (suc) {
                    console.log(suc)
                    res.json({
                        result: {
                            state: 'ok',
                            id: suc.id
                        }
                    })
                }
            });
        }

    })
    // console(1111111)
})


router.get("/addGood", function (req, res, next) {

    let params = {
        // 'productId':req.query.id,
        'productName': req.query.name,
        'salePrice': req.query.price,
        // 'productImage':req.productImage
    }
    console.log(req.query.shopname)
    Ashop.findOne({ "shopname": req.query.shopname }).then((reso, err) => {
        if (reso) {
            console.log(req.query.name)
            reso.goods.push({
                "productId":req.query.id,
                "productName": req.query.name,
                "salePrice": req.query.price,
                "state": false,
                "productImage": "9.jpg",
            });
            //   goods.push(params)
            reso.save(function (err, ress) {
                if (err) {
                    res.json({
                        //   shopname: '',
                        //   order: '',
                        //   kind: '',
                        //   score: '',
                        result: {
                            state: 'notok'
                        }
                    })
                    console.log("Error:" + err);
                } else {
                    res.json({
                        //   shopname: '',
                        //   order: '',
                        //   kind: '',
                        //   score: '',
                        result: {
                            state: 'ok'
                        }
                    })
                    console.log("Res:" + res);
                }

            });
        }

    })
    // console(1111111)
})

           
          
    router.get("/addBlack", function (req, res, next) {

      Ashop.findOne({ "shopname": req.query.shopname }),function(err,doc){
          if(err)
          {
               res.json({
                 //   shopname: '',
                 //   order: '',
                 //   kind: '',
                 //   score: '',
                 result: {
                   state: 'notok'
                 }
               })
               console.log("Error:" + err);
          }else{
              console.log(doc)
              doc.updateMany({"fans.name":req.query.name},{$set:{"fans.$.state":false}}).then(ress=>{
                  res.json({
                      result:{
                          state:'ok'
                      }
                  })
              })
          }
      }
    //   .then((reso, err) => {
    //     if (reso) {
           
    //       console.log(ress);
    //       reso.update({ "fans.name": req.query.name}, { '$set': {  "fans.$.state": false }
    //       }),function(err,res)
    //     //   .then(ress => {
    //     //     //   console.log(reso.fans.state)
    //     //     //     res.json({
    //     //     //   //   shopname: '',
    //     //     //   //   order: '',
    //     //     //   //   kind: '',
    //     //     //   //   score: '',
    //     //     // //   result: {
    //     //     // //     list: ress
    //     //     // //   }
    //     //     // })
    //     //   })
    //     } else console.log('error')
    //   })
      // console(1111111)
     // Ashop.update({"shopname":req.query.shopname},{$set})
    });

   
     router.get("/showFans", function (req, res, next) {
         console.log(req.query.shopname)
             Ashop.find({shopname:req.query.shopname}).then(ress => {
               res.json({
                 result: {
                   list: ress
                 }
               })
             })
      
     });
    router.get("/NoBlack", function (req, res, next) {

      //   let params = {
      //     // 'productId':req.query.id,
      //     'productName': req.query.name,
      //     'salePrice': req.query.price,
      //     // 'productImage':req.productImage
      //   }
      //console.log(req.query.shopname)
        
       Ashop.findOne({
         "shopname": req.query.shopname
       }).then((reso, err) => {
         if (reso) {
           // console.log(ress);
          reso.updateOne({"fans.name":req.query.name},{set:{"state":true}}).then(ress=>{
               res.json({
                 //   shopname: '',
                 //   order: '',
                 //   kind: '',
                 //   score: '',
                 result: {
                   list: ress
                 }
               })
          })
         } else console.log('error')
       })
      // console(1111111)
    });


module.exports = router;
