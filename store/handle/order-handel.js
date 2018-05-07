const order=require("../database-model/Order");
const buyer=require("../database-model/Buyer");
//添加商品订单
function addOrder(seller,buyer,goods,count){
   return  new order({seller,buyer,goods,count}).save()
}
//根据买家id
//查找买家自己买的商品

function findGoodsByBuyerId(buyerId){
    return order.find({buyer: buyerId}).populate(['goods', 'sellers']);
}
//根据商家的id
//查找买家买了什么商品

function findGoodsBySellerId(sellerId){
    return order.find({seller: sellerId}).populate(['goods', 'buyer']);
}
module.exports={addOrder,findGoodsByBuyerId,findGoodsBySellerId}

//这个返回的结果，只有order表单的内容，goods和seller表单的内容就是不出来