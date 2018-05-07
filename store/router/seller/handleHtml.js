const express=require("express");

const router=new express.Router();


const {FindAllGoods}=require("../../handle/goods-handel");
const {findGoodsBySellerId}=require("../../handle/order-handel");
//登录
router.get("/login",(request,response)=>{
    response.render("seller/login");
});

//注册
router.get("/register",(request,response)=>{
    response.render("seller/register");
});

//退出
router.get("/logout",(request,response)=>{
    response.cookies.set('seller', null);
    response.redirect('/login');

});



//其他页面要登录了才能显示
router.use((request,response,next)=>{
    if(response.sellerInfo){
         next();
    }else{
        response.redirect('/login');
    }
})

//查找商家的商品/  商家管理

router.get("/",(request,response)=>{
    FindAllGoods(response.sellerInfo._id)
        .then(
                result=>{
                    response.render('seller/goodslist', {
                        goodsActive: 'active',
                        goodsList: result
                    });
                }
        )
})

//商家信息

router.get("/sellerUser",(request,response)=>{
    response.render("seller/sellerUser",{
        isLogin:response.isLogin
    });
})
//订单管理
router.get("/order-list",(request,response)=>{
let sellerId=response.sellerInfo._id;
    findGoodsBySellerId(sellerId)
        .then(
            result=>{
                console.log(result);
                response.render("seller/order-list",{
                    sellerList:result
                });
            }
        )

})

//添加商品
router.get("/add-goods",(request,response)=>{

    response.render("seller/add-goods",{

    });
})


//修改商品
router.get("/modify-goods",(request,response)=>{

    response.render("seller/modify-goods",{

    });
})

module.exports=router;