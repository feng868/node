//引入创建的数据库模型
const buyer=require("../database-model/Buyer");
//查找是否存在用户，存在不添加，存在添加

//fondOne查找返回结果是布尔值，存在返回true，不存在返回false
function adduser(user,pwd){
   return new Promise((resolve,reject)=>{
       buyer.findOne({user})
       .then(
           result=>{
             if(result){//存在返回true,
                 reject("注册失败，该用户已存在!");
             }else{
                 //不存在，将用户添加到数据库中
               let userInfo=new buyer({
                   user,pwd
               });
                userInfo.save()
                   .then(
                       (result)=>{
                           if(result){
                               console.log("保存成功！");
                               resolve();
                           }else{
                                console.log("保存失败！");
                                reject("注册失败,未知错误，请重试!");
                         }
                      });
                }
          });
   });
}


//匹配用户  ，是否登录

function  matchUser(user,pwd){
     return new Promise((resolve,reject)=>{
         buyer.findOne({user,pwd})
         .then(
             result=>{
                 if(result){//匹配成功
                     resolve(result.id)
                 }else{
                     reject("用户名或密码错误！");
               }
     }
         )
     })
}


//根据用户id
// 查找用户

function findUserById(id){
     return new Promise((resolve,reject)=>{
         buyer.findById(id)
         .then(
             (result)=>{
               if(result){
                   resolve(result)
               }else{
                   reject()
               }
             },
             (error)=>{
                 console.log(error)
               }

         )
     })
}









module.exports={adduser,matchUser,findUserById}