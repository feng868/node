const express=require("express");

const mongoose=require("mongoose");

const swig=require("swig");

const Cookies=require("cookies");

//引入 handleHtml

 const  handleHtml=require("./router/buyer/handleHtml")

//引入 handleApi

const  handleApi=require("./router/buyer/handleAPi")

const {findUserById}=require("./handle/buyer-handleUser");

new Promise((resolve,reject)=>{

    //开启数据库

    mongoose.connect("mongodb://localhost:27010",(error)=>{
        if(error){
            console.log("数据库开启失败！");
            console.log(error);
        }else{
            console.log("数据库开启成功！");
            resolve()
    }
  })
})
.then(
    ()=>{

        //设置服务器

      const server=express();

        //处理cookies
    server.use((request,response,next)=>{

        //创建cookie对象
        let cookies = new Cookies(request, response);
        response.cookies = cookies;
        next();
    })


    //处理静态文件

    server.use("/static",express.static(__dirname+"/static"));



     //取得用户的id
        // 判断登录了没,cookies有没有被改过
        server.use((request,response,next)=>{
            let userId=response.cookies.get("userId");
            if(userId){
                findUserById(userId)
                    .then(
                        (result)=>{//存在，登录了
                            response.buyerInfo = result;
                            next();
                        },
                        ()=>{//不存在，id被篡改了
                            next();
                        }
                    )
            }else{
                response.buyerInfo ={};
                next();
            }
        })

        // 处理ajax请求
        server.use('/api', handleApi);

    //配置html模板

     server.engine("html",swig.renderFile);

     server.set("views",__dirname+"/html");

     server.set("view engine","html");

     swig.setDefaults({cache:false});


        //处理html
        server.use("/",handleHtml);


      server.listen(8080,"localhost",(error)=>{
          if(error){
              console.log("服务器开启失败");
              console.log(error)
          }else{
              console.log("服务器开启成功！");
          }
      })

})