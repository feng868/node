$(function(){

    //点击登录按钮
    $(".btn").on("click",function(){
        var user=$("#exampleInputEmail1").val();
        var pwd=$("#exampleInputPassword1").val();
        if(!user||!pwd){
            //输入为空
            alert("请输入！");
            return;
        }
        $.ajax({
            url:"/api/login",
            type:"post",
            data:{
                user,
                pwd
            },
            success:function(data){
                if(!data.status){
                    location.href="/"
                }else{
                    alert(data.message);
                }
            },
            error:function(){}
        })
    })
})

