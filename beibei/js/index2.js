/**
 * Created by Administrator on 2015/9/7.
 */
/*
 * @liyan
 * emil
 * */
$(function(){
    var beibei1={
        ajax:function(){

            $.ajax({

            })
        },

        eventBind:function(){

            var $inp1=$(".inp1 input");
            var $inp2=$(".inp2 input");
            var $inp3=$(".inp3 input");
            var $inp4=$(".inp4 input");
            var temp1=false,temp2=false,temp3=false,temp4=false;

            //用户文本框
            $inp1.on("keyup",function(){
                var reg1=/^\d{11}$/,reg2=/^\d{6,11}[@]{1}[a-z]{2,5}[.]{1}[a-z]{2,5}$/;
                if(reg1.test($inp1.val()) || reg2.test($inp1.val())){
                    $(".err1").hide();
                    temp1=true;
                }else{
                    $(".err1").show();
                    temp1=false;
                }
            }).on("focus",function(){
                $inp1.val("");
            })

            //密码文本框
            $inp2.on("keyup",function(){
                var reg1=/^\S{6,16}$/;   //非空格
                if(reg1.test($inp2.val())){
                    $(".err2").hide();
                    temp2=true;
                }else{
                    $(".err2").show();
                    temp2=false;
                }
            }).on("focus",function(){
                $inp2.val("");
            })


                $(".inp2 i").on("click",function(){
                    if($(this).css("background-position")=="2px -61px") {
                        $(this).css({"background": "url('images/u_14x93.jpg')no-repeat 2px -78px"});
                        $inp2.attr("type", "text");
                    }else{
                            $(this).css({"background": "url('images/u_14x93.jpg')no-repeat 2px -61px"});
                            $inp2.attr("type", "password");
                    }
                })


            //验证码框
            var $check=$(".inp3_img");
            $inp3.on("keyup",function(){
                if($inp3.val()==$check.html()){
                    $(".err3").hide();
                    temp3=true;
                }else{
                    $(".err3").show();
                    temp3=false;
                }
            }).on("focus",function(){
                $inp3.val("");
            })



            te();
            $check.on("click",function(){
                te();
                return false;
            })
             function te(){
                 var result = [];

                 for(var i=0;i<2;i++){
                     var ranNum1=48+Math.floor(Math.random()*10);//0-9
                     var ranNum2 = 65+Math.ceil(Math.random() * 25); //生成一个0到25的数字
                     result.push(String.fromCharCode(ranNum2));
                     result.push(String.fromCharCode(ranNum1));
                 }
                 var res=result.toString();
                 $(".inp3_img").html(res.split(","));
                 return res;
             }



            //校验码
            $inp4.on("keyup",function(){
                var reg1=/^[0-9]{4,6}$/;
                if(reg1.test($inp4.val()) && $emil.html()!="获取校验码"){
                    $(".err0").hide();
                    temp4=true;
                }else{
                    //$(".err0").show();
                    temp4=false;
                }
            }).on("focus",function(){
                $inp4.val("");
            })

            //校验码按钮
            var $emil=$(".emil");
            $emil.on("click",function(){
                var num=60;
                $(this).html(num+"秒");
                var timer=setInterval(function(){

                    num--;
                    $emil.html(num+"秒");
                    if(num==0){
                        $emil.html("获取校验码");
                        clearInterval(timer);

                    }
                    console.log(num);
                },1000);
            })



            //注册按钮
            $(".btn").on("click",function(){
                if(temp1==true && temp2==true && temp3==true && temp4==true){
                    alert("登陆成功！");
                    $(".err0").hide();
                }else{
                    if(temp1==false){
                        $(".err1").show();
                    }else if(temp2==false){
                        $(".err2").show();
                    }else if(temp3==false){
                        $(".err3").show();
                    }else if(temp4==false){
                        $(".err0").show();
                    }
                }
            })


        },

        init:function(){
            this.eventBind();
        }
    }

    beibei1.init();
})