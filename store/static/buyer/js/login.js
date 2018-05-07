$(function(){
         main={
             btn:$(".btn"),
             init:function(){
                 this.btn.click(function(){
                     var user=$("#exampleInputEmail1").val();
                     var pwd=$("#exampleInputPassword1").val();
                     if(!user||!pwd){
                         //输入为空
                         alert("请填写完整！")
                         return;
                     };
                     $.ajax({
                         url:"/api/login",
                         type:"post",
                         data:{
                             user,
                             pwd
                         },
                         success:function(data){
                             if(data.status==1){
                                 alert(data.messages)
                             }else{
                                 location.href="/"
                             }
                         },
                         error:function(){}
                     })
                 })
             }
         }
    main.init();
})