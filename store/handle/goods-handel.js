const goods=require("../database-model/Goods");


//添加商品
function addGoods(name,introduce,price,breviaryPath,detailsPath,sellerId){
    return new Promise((resolve,reject)=>{
        new goods({
            name,
            introduce,
            price,
            breviaryPath,
            detailsPath,
            seller:sellerId
        })
            .save()
            .then(
                (result)=>{
                    resolve('保存成功');
                },
                //保存失败
                (error)=>{
                    reject('保存失败');
                }
            )
    })
}

//根据商家id
//查找商家的所有商品

function FindAllGoods(sellerID){
    return new Promise((resolve,reject)=>{
        goods.find({
            seller: sellerID
        })
            .then(
                result=>{
                    resolve(result);
                },
                error=>{
                    resolve([]);
                }
            )
    })
}



//查找后几位商品

function FindLastGoods(num) {

    return new Promise((resolve, reject) => {
        num=Number(num)
        goods.count()
            .then(
                result => {
                    if(result>num){
                        page = result - num;
                        goods.find().skip(page).limit(num)
                            .then(
                                result => {
                                    resolve(result)
                                }
                            )
                    }else{
                        goods.find().then(
                            result=>{
                                resolve(result);
                            }
                        )
                    }
                }
            )
    });
}


//查找所有商家的商品

function findAllselerGoods(){
        return goods.find();
}

//根据商品id
//查找商品

function findGoods(goodsId){
 return goods.findById({
     _id:goodsId
 })
}

//根据商家id
//查找商品
function findGoodsBySeller(sellerId){
    return new Promise((resolve,reject)=>{
        goods.find({seller:sellerId})
            .then(
                (result)=>{
                    resolve(result)
                },
                (error)=>{
                    reject([]);
                }
            )
    })
}

//根据商品id
//查找商家
function findSellerBygoodsId(goodsId){
    return goods.findById(goodsId);

}
module.exports={addGoods,FindAllGoods,FindLastGoods,findAllselerGoods,findGoods,findGoodsBySeller,findSellerBygoodsId}