/**
 * Created by Administrator on 2015/9/7.
 */
/*
 * @liyan
 * emil
 * */
$(function(){

    var beibei= {
        // ajax函数
        ajax: function () {
            $.ajax({
                'url': "http://sapi.beibei.com/item/category-100.html?callback=BeibeiItemCategoryGet",
                'dataType': 'jsonp',
                "jsonpCallback":"BeibeiItemCategoryGet",
                "scriptCharset":"gb2312",
                'success': function (data) {
                    var d=data.main_categorys;
                    //console.log(d[0].subdivision_categorys);  //取到15个列表对象
                    var _html="";
                    var _txt="";
                    for(var i=0;i< d.length;i++){
                      _html+="<li>"+ d[i].category_name+"</li>";
                        _txt+="<div>";
                        for(var j=0;j<d[i].subdivision_categorys.length;j++){
                            _txt+="<a>";
                            //_txt+="<img>"+d[i].subdivision_categorys[j].img+"</img>";
                            _txt+="<img"+" "+"src='"+d[i].subdivision_categorys[j].img+"'>"+"</img>";
                            _txt+="<p>"+d[i].subdivision_categorys[j].title+"</p>";
                            _txt+="</a>";
                        }
                        _txt+="</div>";
                    }
                    $(_txt).appendTo($(".backimg"));
                    $(_html).appendTo($(".back ul"));
                }
            })
        },

        eventBind: function () {
            $(".guan").on("mouseover", function () {
                $(".weibo").show();
                $(this).css({
                    "border": "1px solid #ccc",
                    "background": "white"
                });
            }).on("mouseout", function () {
                $(".weibo").hide();
                $(this).css({
                    "border": "1px solid #F4F4F4",
                    "background": "#F4F4F4"
                });
            })


            $(".pad1").on("mouseover", function () {
                $(".pad1_box").show();
            }).on("mouseout", function () {
                $(".pad1_box").hide();
            })

            //(改进)
            if($.cookie("username")){
                $(".pad1").on("click",function(){
                    location.href="index3.html";
                })
            }

            //跳转详情
            $(".lis1 ul li").on("click",function(){
                location.href="indexxq.html";
            })
            //购物车

            var $ccoul=$(".cco ul");
            var $ccodiv=$(".cco>div");
            var $n=$(".pad1_box>p");
            var $money=$(".pad1_bol span");
            var money=0;

            //var $pad1=$(".pad1");
            //var $Img=$(".con1_to a img");

            var carobj={};
            var listarr=[];
            if($.cookie("array")!=undefined){
                $ccodiv.html("");
                takeInt();
                var json0=$.parseJSON($.cookie("array"));
                console.log(json0.content);
                for(var i=0;i<json0.content.length;i++){
                    listarr.push(json0.content[i]);
                }
            }else{
                $ccodiv.html("赶紧去挑选商品吧");
            }

            function takeInt(){
                //取值
                var json2=$.parseJSON($.cookie("array"));
                var jso=json2.content;
                var list = "";
                for(var i=0;i<jso.length;i++){
                    list+='<li class="clearfix"><img src="'+jso[i].img+'">';
                    list+='<div class="car_tit"><h4>'+jso[i].title+'</h4>';
                    list+='<p>'+"颜色："+jso[i].color+" 尺码："+jso[i].size+'</p></div>';
                    list+='<div class="car_tco"><span>'+"￥"+jso[i].price+'</span><div class="number">'+"x"+jso[i].numb+'</div></div>';

                    money+=jso[i].price*jso[i].numb;
                    $money.html(money+".00");
                }
                $ccoul.html(list);
                carobj.inter=$(".cco ul li").length;
                $n.text("购物车有"+carobj.inter+"件商品");
                $pad1_txt.html(carobj.inter);
            }


            $(".pad2").on("mouseover", function () {
                $(this).css({"background":"pink","color":"white"});
                $(".pad2_box").show();
            }).on("mouseout", function () {
                $(this).css({"background":"white","color":"pink"});
                $(".pad2_box").hide();
            })
            $(".pad3").on("mouseover", function () {
                $(this).css("background", "pink");
                $(this).text("客服在线").css("color", "white");
            }).on("mouseout", function () {

            })

            $(".pad4").on("mouseover", function () {
                $(this).css({"background":"pink","color":"white"});
            }).on("mouseout", function () {
                $(this).css({"background":"white","color":"pink"});
            }).on("click", function () {
                $("html,body").animate({scrollTop:0});
                $(window).scrollTop(0);    //瞬间弹到顶部
            })


            $(".car").on("mouseover", function () {
                $(".car_box").show();
            }).on("mouseout", function () {
                $(".car_box").hide();
            })

            //滚动事件
            var $fudong=$(".fudong");
            var $ful=$(".fudong ul");
            var $imgs=$(".bigtit");
            console.log($imgs);
            var temp=true;

            //楼层
            $ful.on("click","li",function(){
                var idx=$(this).index();
                var imgtop=$imgs.eq(idx).offset().top;
                $("html,body").animate({scrollTop:imgtop-30});
                $(window).animate({scrollTop:imgtop-30});
            })
            $(".totop").on("click",function(){
                $("html,body").animate({scrollTop:0});
                $(window).animate({scrollTop:0});
            })



            $(window).on("scroll", function () {
                var scr = $(window).scrollTop();

                //左侧弹框和注册弹框的淡入淡出
                $fudong.animate({top:scr+30},10);
                if(scr > $(".box").offset().top) {
                      $fudong.hide(1000);
                }else{
                    $fudong.show(1000);
                }


                //console.log(temp);
                if (temp==true && scr > $(".w").offset().top) {
                    $(".hidden").show();
                    $(".jump").show(1000);
                    $(".clos").on("click", function () {
                        $(".jump").hide(1000);
                        $(".hidden").hide();
                        temp=false;
                    })
                }



                //固定导航条
                if (scr >= 160) {
                    $(".con_nav").css({
                        "position": "fixed",
                        "background": "white",
                        "top": 0
                    });
                    $("._not").show();
                    $(".tel").hide();
                    $(".shopping").show();
                    $(".big").css("marginTop", $(".con_nav").height());
                }
                else {
                    $(".con_nav").css("position", "static");
                    $(".big").css("marginTop", 0);
                    $(".tel").show();
                    $(".shopping").hide();
                    $("._not").hide();
                }


            })



            var $ul2 = $(".list1 ul");
            var $div2 = $(".someimg div");
            $ul2.on("mouseover", "li", function () {
                $div2.eq($(this).index()).addClass("check").siblings("div").removeClass("check");
                $(this).addClass("check").siblings("li").removeClass("check");
            })


            var $ul3 = $(".list3 ul");
            var $div3 = $(".items");
            $ul3.on("mouseover", "li", function () {
                $div3.eq($(this).index()).addClass("check3").siblings("div").removeClass("check3");
                $(this).addClass("check3").siblings("li").removeClass("check3");
            })

            $(".txthid").on("mouseover", function () {
                $(this).css({
                    "position": "absolute",
                    "overflow": "visible",
                    "background": "gray",
                    "border": "1px solid #ccc",
                    "height": 160
                });
            }).on("mouseout", function () {
                $(this).css({
                    "position": "static",
                    "overflow": "hidden",
                    "background": "none",
                    "border": "none",
                    "height": 48
                });
            })


            $(".age").on("mouseover", function () {
                $(".showage").show();
            }).on("mouseout", function () {
                $(".showage").hide();
            })


            //请登录  用户名
            var $zhuce=$(".zhuce");
            var $loge=$(".loge");
            if($.cookie("username")){
                $loge.html($.cookie("username"));
                $zhuce.html("[退出]");
                $zhuce.on("click",function(){
                    window.location="index1.html";
                })
                temp=false;
            }



            //在售分类接口
            $(".sale").on("mouseover",function(){
               $(".back").show();

                $(".back ul").on("mouseover","li",function(){
                    $(this).addClass("appear").siblings("li").removeClass("appear");
                    $(".backimg div").eq($(this).index()).addClass("appear").siblings("div").removeClass("appear");
                })

                $(".backimg div a").hover(function(){
                    $(this).children(0).css("color","pink");
                },function(){
                    $(this).children(0).css("color","gray");
                });
            }).on("mouseout",function(){
                $(".back").hide();
            })

            //注册框弹出
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
                    alert("注册成功！");
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



            //倒计时
            setInterval(function(){
                        var $span0=$(".title span:nth-child(4n)"),
                            $span1=$(".title span:nth-child(4n+1)"),
                            $span2=$(".title span:nth-child(4n+2)"),
                            $span3=$(".title span:nth-child(4n+3)");
                        var enddate=new Date("2016/10/1 00:00:00");
                        var begindate=new Date();
                        var seconds=(enddate.getTime()-begindate.getTime())/1000;//把毫秒转换成秒
                        $span1.html(parseInt(seconds/3600/24));
                        $span2.html(parseInt((seconds/3600)%24));
                        $span3.html(Math.floor(seconds/60%60));
                        $span0.html(Math.floor(seconds%60));
                },1000)


            //轮播图
            var $ul0=$(".list2 ul");
            var $imgh=$(".showimg img");
            var tp=0;
            var timer=null;
            timer=setInterval(function(){
                $ul0.animate({left:-tp*$imgh.width()});
                tp++;
                if(tp>=$imgh.length){
                    tp=0;
                    $ul0.animate({left:-tp*$imgh.width()});
                }
            },2000);

             var $ldv=$(".list2 div");
             var $pre=$(".pre"),$next=$(".next");
             $(".list2").on("mouseover",function(){
                 $ldv.show();
             }).on("mouseout",function(){
                 $ldv.hide();
             })
             $ldv.on("mouseover",function(){
                  clearInterval(timer);
             }).on("mouseout",function(){
                 timer=setInterval(function(){
                     $ul0.animate({left:-tp*$imgh.width()});
                     tp++;
                     if(tp>=$imgh.length){
                         tp=0;
                         $ul0.animate({left:-tp*$imgh.width()});
                     }
                 },2000);
             })

            $next.on("click",function(){
                tp++; console.log(tp);
                if(tp>=$imgh.length){
                    tp=0;
                }
                $ul0.animate({left:-tp*$imgh.width()});
            })

            $pre.on("click",function(){
                if(tp<=0){
                    tp=$imgh.length;
                }
                console.log(tp);
                tp--;
                $ul0.animate({left:-tp*$imgh.width()});
            })


        },
        init: function () {
            this.eventBind();
            this.ajax();
        }

    }

    // 初始化
    beibei.init();
})