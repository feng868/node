const express = require('express');

const bodyparser=require("body-parser")

const url=require("url");

const router = new express.Router();

const {adduser,matchUser}=require("../../handle/buyer-handleUser");
const {findSellerBygoodsId}=require("../../handle/goods-handel");
const {addOrder}=require("../../handle/order-handel");


router.use(bodyparser.urlencoded());


//注册
router.post("/register",(request,response)=>{
     const {user,pwd}=request.body;
        adduser(user,pwd)
        .then(
            //成功的回调
            ()=>{
                response.json({
                status:0,
                messages:"新增成功"
                })
            },
            //失败的回调
            (msg)=>{
                response.status(200).json({
                    status:1,
                    messages:msg
                })
         }
        )

})

//登录
router.post("/login",(request,response)=>{

    const {user,pwd}=request.body;

    matchUser(user,pwd)
        .then(
            (id)=>{
        //保存用户登录状态,将用户（id， 时间戳，过期时间 =>加密）存在cookies
        response.cookies.set("userId",id);
                response.json({
                status:0,
                messages:"登录成功"
            })
            },
            (msg)=>{
                response.status(200).json({
                    status:1,
                    messages:msg
                })
            }
        )

})

//购买

router.post("/buy",(request,response)=>{
  if(response.buyerInfo["_id"]){
      let {baseUrl, count} = request.body;
      //得到买家id
      buyer=response.buyerInfo._id;
      //在url地址上得到商品id
      goods=url.parse(baseUrl, true).query.goodsId;
      //得到卖家id
      findSellerBygoodsId(goods)
          .then(
              result=>{
                  seller=result.seller;
                  //购买，将商品添加到订单上
                  count=1;
                  addOrder(seller,buyer,goods,count)
                      .then(
                          result=>{
                              response.json({
                                  status:0,
                                  message:"购买成功！"
                              })
                          }
                      )

              }
          )

  }else{
      response.json({
          status: 1,
          message: '请先登录'
      })
  }
})
module.exports=router;