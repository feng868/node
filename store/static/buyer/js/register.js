
$(function(){
    var main={
        register:$("#register"),
        init:function(){
            this.register.click(function(){
                var user=$("#exampleInputEmail1").val();
                var pwd=$("#exampleInputPassword1").val();
                var pwd1=$("#Password").val();
                if(!user||!pwd||!pwd1){
                    //输入为空
                    alert("请填写完整！")
                    return;
                }
                else if(pwd!=pwd1){
                    alert("两次密码不相等！")
                    return;
                }
                $.ajax({
                    url:"/api/register",
                    type:"post",
                    data:{
                       user,
                       pwd
                    },
                    success:function(data){
                        if(data.status==1){
                           alert(data.messages)
                        }else{
                            location.href="/login"
                        }
                    },
                    error:function(){}
                })

            })
        }
    }
    main.init();
})