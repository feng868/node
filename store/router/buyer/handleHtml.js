const express=require("express");
const url=require("url");
const router=new express.Router();

const {findUserById}=require("../../handle/buyer-handleUser");
const {FindLastGoods,findAllselerGoods,findGoods,findGoodsBySeller}=require("../../handle/goods-handel")
const {findAllSeler,findLastSeller,findSellerById}=require("../../handle/seller-handleUser");
const {findGoodsByBuyerId}=require("../../handle/order-handel");
//登录
router.get("/login",(request,response)=>{
    response.render("buyer/login");
})
//注册
router.get("/register",(request,response)=>{
    response.render("buyer/register");
})

//退出
router.get("/logout",(request,response)=>{
        response.cookies.set("userId",null);
        response.redirect("/");
})

router.use((request,response,next)=>{
    let cookie=response.buyerInfo._id;
    if(!cookie){
        response.isLogin=false;
        next();
        return;
    }
    findUserById(cookie)
        .then(
            (result)=>{
            response.isLogin = true;
            next();
        },
            ()=>{
            response.isLogin = false;
            next();
        }
        )
})



// 首页    渲染商品，商家
router.get("/",(request,response)=>{
    Promise.all([FindLastGoods(4), findLastSeller(8)])
        .then(
            result=>{
                //响应页面
                response.render('buyer/index', {
                    isLogin: response.isLogin,
                    goodsList: result[0],
                    sellerList: result[1]
                });
            }
        )



});


//个人中心
router.get("/user",(request,response)=>{
    response.render("buyer/user",{
    isLogin: response.isLogin
    });
});

//我的商品

router.get("/myorder",(request,response)=>{
    console.log("1")
    const buyerId=response.buyerInfo._id;
    findGoodsByBuyerId(buyerId)
        .then(
            result=>{
                console.log("2")
                console.log(result)
                response.render("buyer/myorder",{
                    isLogin:response.isLogin,
                    orderList:result
                });
            }
        )

})

//商品列表

router.get("/goodslist",(request,response)=>{
    findAllselerGoods()
        .then(
                response.render("buyer/goodslist",{
                    isLogin:response.isLogin,
                    sellerAllGoodsList:result
                })

        )

})


//店铺列表

router.get("/sellerlist",(request,response)=>{

    findAllSeler()
        .then(
            result=>{
                response.render("buyer/sellerlist",{
                    isLogin:response.isLogin,
                    sellerAllList:result
                });
            }
        )

})

//商品详情

router.get("/goodsDetails",(requset,response)=>{

    const goodsId=requset.query.goodsId;
    console.log(goodsId);
    findGoods(goodsId)
        .then(
            result=>{
                response.render("buyer/goodsDetails",{
                    isLogin:response.isLogin,
                    sellerInfo: result.seller,
                    goodsInfo: result
                });
            }
        )

})
//店铺详情

router.get("/sellerDetails",(requset,response)=>{
    const sellerId=requset.query.sellerId;
    Promise.all([findSellerById(sellerId),findGoodsBySeller(sellerId)])
        .then(
            result=>{
                response.render("buyer/sellerDetails",{
                    isLogin:response.isLogin,
                    sellerInfo: result[0],
                    goodsList:result[1]
                });
            }
        )

})



module.exports=router;