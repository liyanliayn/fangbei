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
            var temp1=false,temp2=false,temp3=false;

            //用户文本框
            $inp1.on("keyup",function(){
                user();
            }).on("focus",function(){
                $inp1.val("");
            })

            function user(){
                var reg1=/^\d{11}$/,reg2=/^\d{6,11}[@]{1}[a-z]{2,5}[.]{1}[a-z]{2,5}$/;
                if(reg1.test($inp1.val()) || reg2.test($inp1.val())){
                    $(".err1").hide();
                    temp1=true;
                }else{
                    $(".err1").show();
                    temp1=false;
                }
            }

            //密码文本框
            $inp2.on("keyup",function(){
                 pwd();
            }).on("focus",function(){
                $inp2.val("");
            })

            function pwd(){
                var reg1=/^\S{6,16}$/;   //非空格
                if(reg1.test($inp2.val())){
                    $(".err2").hide();
                    temp2=true;
                }else{
                    $(".err2").show();
                    temp2=false;
                }
            }


            //滑动框

            var gra=document.getElementById('gra');
            var mov=document.getElementById('mov');
            var ww=gra.offsetWidth-mov.offsetWidth;



                mov.onmousedown= function(evt){
                    var e=evt||window.event;
                    eX=e.offsetX;//拿到我们鼠标点下去的坐标

                    document.onmousemove= function(evt){
                        var ee=evt||window.event;

                        var eeX= ee.clientX-eX-gra.offsetLeft;
                        console.log(ww);  //288

                        if(eeX>0 && eeX<=ww){
                            console.log(mov.style.left);
                            mov.style.left=eeX+"px";
                            $(".col").css({"width":eeX});
                            if(mov.style.left==ww+"px"){
                                $(".gratxt").css({"color":"white"});
                                $(".gratxt").html("验证通过");
                                $(".mov").html("Yes");
                                $(".err3").hide();
                                mov.style.left=ww+"px";
                                $(".col").css({"width":ww});
                                temp3=true;
                                mov.onmousedown=null;
                            }else{
                                $(".err3").show();
                                temp3=false;
                            }
                        }
                    }
                    return false;
                }

                $("body").on("mouseup",function(){
                        document.onmousemove=null;
                        var ww=gra.offsetWidth-mov.offsetWidth;
                        var eeX=Math.ceil($(".mov").position().left);
                        if(eeX<ww){
                            mov.style.left=0+"px";
                            $(".col").css({"width":0});

                        }else {
                            mov.style.left=ww+"px";
                            $(".col").css({"width":ww});
                            temp3=true;
                        }

                })


            //自动登录
                var $bv=$(".bv input");

                console.log($.cookie("username"));
                var $name= $.cookie("username");
                $inp1.val($name);
                var $pwd= $.cookie("passwd");
                $inp2.val($pwd);



            //登录按钮
            $(".btn").on("click",function(){
                console.log($bv.prop("checked"));
                if($bv.prop("checked")){
                    $.cookie("username", $inp1.val(), {expires: 1});
                    $.cookie("passwd", $inp2.val(), {expires: 1});
                }else{
                    $.cookie("username",$inp1.val());
                    console.log($.cookie("username"));
                }
                user();pwd();
                if(temp1==false || temp2==false){
                    $(".err0").show();
                }else if(temp3==false){
                    $(".err3").show();
                }else{
                    location.href="index.html";
                }

            })


        },

        init:function(){
            this.eventBind();
        }
    }

    beibei1.init();
})