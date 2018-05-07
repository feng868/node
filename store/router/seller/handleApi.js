const express = require('express');

const bodyparser=require("body-parser")

const router = new express.Router();

const multiparty = require('multiparty')

const {addseller,matchseller}=require("../../handle/seller-handleUser")

const {addGoods}=require("../../handle/goods-handel");
router.use(bodyparser.urlencoded());


//注册后台响应
router.post("/register",(request,response)=>{
    const {user,pwd,logoPath,bannerPath}=request.body;
    addseller(user,pwd,logoPath,bannerPath)

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


//提交logo，banaer后台响应

router.post("/upload-img",(request,response)=>{
    // 创建解析表单对象
    let form = new multiparty.Form({
        uploadDir: './static/seller/images'
    });
    //解析form表单中的数据
    form.parse(request,(error, fields, files)=>{
        if(!error){
            //判断文件是否为图片
            // console.log(files.imgs[0].originalFilename)//png  jpeg  jpg
            //响应客户端
            let imgsPath = files.imgs.map(item=>{
                return '/'+item.path;
            })
            response.json({
                status: 0,
                message: '上传成功',
                data: {
                    imgPath:imgsPath
                }
            })
        }
    })
})

//登录后台响应
router.post("/login",(request,response)=>{
    const {user,pwd}=request.body;
    matchseller(user)
        .then(
            //成功的回调
            (id)=>{
                response.cookies.set("seller",id);
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
            })
})

//商品添加响应

router.post("/addGoods",(request,response)=>{
    const {name,introduce,price,breviaryPath,detailsPath}=request.body;
    addGoods(name,introduce,price,breviaryPath,detailsPath,response.sellerInfo._id)
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
            })
})


//查找商家的所有商品

// router.post()

module.exports=router;