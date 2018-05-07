//引入创建的数据库模型
const seller=require("../database-model/Seller");


//查找是否存在卖家，存在不添加，存在添加

//fondOne查找返回结果是布尔值，存在返回true，不存在返回false

function addseller(user,pwd,logoPath,bannerPath){

    return new Promise((resolve,reject)=>{
        seller.findOne({user})
            .then(
                result=>{
                    if(result){
                        reject("注册失败，该用户已存在!");
                    }else{
                        let sellerInfo=new seller({
                            user,
                            pwd,
                            logoPath,
                            bannerPath
                        });
                        sellerInfo.save()
                            .then(
                                  (result)=>{
                                    if(result){
                                        console.log("保存成功！");
                                        resolve();
                                    }
                                    else{
                                        console.log("保存失败！");
                                        reject("注册失败,未知错误，请重试!");
                                    }
                                })
                    }
                })
    })
}

//匹配登录
function matchseller(user){
return new Promise((resolve,reject)=>{
    seller.findOne({user})
        .then(
            result=>{
                if(result){
                    resolve(result.id)
                }else{
                    reject("用户名密码错误！")
                }
            }
        )
})
}


//根据商家id
// 查找商家
function findSellerById(id){
return new Promise((resolve,reject)=>{
    seller.findById(id)
        .then(
            (result)=>{
                if(result){
                    resolve(result);
                }else {
                    reject()
                }
            },
            (error)=>{
                console.log(error)
            }
        )
})
}
//查找后几位商家

function findLastSeller(num){
    return new Promise((resolve,reject)=>{
        num=Number(num);
        seller.count()
            .then(
                result=>{
                    if(result>num){
                        page=result-num;
                        seller.find().skip(page).limit(num)
                            .then(
                                result=>{
                                    resovle(result)
                                }
                            )
                    }else{
                        seller.find().then(
                            result=>{
                                resolve(result);
                            }
                        )
                    }
                }
            )
    })
}

//查找所有店铺
function findAllSeler(){
    return seller.find()


}


module.exports={addseller,matchseller,findSellerById,findLastSeller,findAllSeler}