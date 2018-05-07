$(function(){

var logoPath="";
var bannerPath="";
//logo提交图片事件
    $("#logo").on("change",function(){
        var form=$(".register-form")[0];
        var formData=new FormData(form);

        $.ajax({
            url:"/api/upload-img",
            type:"post",
            data:formData,
            processData: false,//传输的数据，不被jquery封装
            contentType: false,//数据编码格式不使用jquery的方式
            success:function(result){
                $('.img-logo')[0].src = result.data.imgPath[0];
                logoPath = result.data.imgPath[0];
            },
            error:function(){

            }
        })
    })


//logo提交图片事件
    $("#banner").on("change",function(){
        var form=$(".register-form")[0];
        var formData=new FormData(form);

        $.ajax({
            url:"/api/upload-img",
            type:"post",
            data:formData,
            processData: false,//传输的数据，不被jquery封装
            contentType: false,//数据编码格式不使用jquery的方式
            success:function(result){
                $('.img-banner')[0].src = result.data.imgPath[0];
                bannerPath = result.data.imgPath[0];
            },
            error:function(){

            }
        })
    })





    //点击注册按钮
    $("#register").on("click",function(){

        var user=$("#exampleInputEmail1").val();
        var pwd=$("#exampleInputPassword1").val();
        if(!user||!pwd||!logoPath||!bannerPath){
            //输入为空
            alert("请输入！");

            return;
        }

        $.ajax({
            url:"/api/register",
            type:"post",
            data:{
                user,
                pwd,
                logoPath,
                bannerPath
            },
            success:function(data){
                if(data.status==0){
                    location.href="/login"
                }else{
                    alert(data.message)
                }
            },
            error:function(error){
                console.log(error)
            }
        })
    })
})