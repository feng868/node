$(function(){
            var breviaryPath=[];
           var detailsPath=[];


       //缩略图
        $("#breviary").on("change",function(){
            var form=$(".addgoods-form")[0];
            var formData=new FormData(form);
        $.ajax({
            url:"/api/upload-img",
            type:"post",
            data:formData,
            processData: false,//传输的数据，不被jquery封装
            contentType: false,//数据编码格式不使用jquery的方式
            success:function(result){
                $('.img-breviary')[0].src = result.data.imgPath[0];
                breviaryPath.push(result.data.imgPath[0]);
            },
            error:function(){

            }
        })
        })

    //详情图
        $("#details").on("change",function() {

            var form = $(".addgoods-form")[0];
            var formData = new FormData(form);
            $.ajax({
                url: "/api/upload-img",
                type: "post",
                data: formData,
                processData: false,//传输的数据，不被jquery封装
                contentType: false,//数据编码格式不使用jquery的方式
                success: function (result) {
                    $('.img-details')[0].src = result.data.imgPath[0];
                    detailsPath.push(result.data.imgPath[0]);
                },
                error: function () {

                }
            })
        })

    //新增按钮
    $("#add").on("click",function(){
        var name=$("#name").val();
        var introduce=$("#introduce").val();
        var price=$("#price").val();
        if(!name||!introduce||!price||!breviaryPath||!detailsPath){
            //输入为空
            alert("请输入！");
            return;
        }
        $.ajax({
            url:"/api/addGoods",
            type:"post",
            data:{
                name,
                introduce,
                price,
                breviaryPath,
                detailsPath
            },
            success:function(data){
               location.href="/"
            },
            error:function(){}
        })
    })

})