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
            //   shopname: '',
            //   order: '',
            //   kind: '',
            //   score: '',
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
router.get("/addGood", function (req, res, next) {

           let params={
        // 'productId':req.query.id,
         'productName':req.query.name,
         'salePrice': req.query.price,
        // 'productImage':req.productImage
      }
      console.log(req.query.shopname)
           Ashop.findOne({"shopname":req.query.shopname}).then((reso,err)=>{
          if(reso){
              console.log(req.query.name)
              reso.goods.push({
                  "productId": req.query.name,
                  "salePrice": req.query.price,
                  "state":false
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
                       state:'ok'
                     }
                   })
                 console.log("Res:" + res);
               }

             });
          }
       
      })
     // console(1111111)
    });
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
                 //   shopname: '',
                 //   order: '',
                 //   kind: '',
                 //   score: '',
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
