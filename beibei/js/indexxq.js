/**
 * Created by Administrator on 2015/9/7.
 */
/*
 * @liyan
 * emil
 * */
$(function(){
    var cont= {
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
        eventBind:function(){

            //放大镜
            $(".jqzoom").imagezoom({xzoom:350,yzoom:350});

            //请登录  用户名
            var $zhuce=$(".zhuce");
            var $loge=$(".loge");
            if($.cookie("username")){
                $loge.html($.cookie("username"));
                $zhuce.html("[退出]");
                $zhuce.on("click",function(){
                    location.href="index1.html";
                })
            }

            // 获取页面的主要元素
            var $focus = $('#focus');
            var $midPic = $('#midpic');
            var $smallPic = $('#smallpic');
            var $spSrc = $('#smallpic').find('img').attr('src');

            var $li = $smallPic.children('li');
            var index = 0; // 显示图片的初始化索引

            // 左箭头的点击事件
            $focus.on('click', 'a.prev', function () {
                index--;

                slider($(this));
            })

            // 右箭头的点击事件
            $focus.on('click', 'a.next', function () {
                index++;

                slider($(this));
            })

            function slider (_this) {

                if (index == 0){
                    _this.attr('class','prev-unable').next().attr('class','next');
                } else if (index > $li.length - 6){
                    _this.attr('class','next-unable').prev().attr('class','prev');
                }

                $smallPic.animate({marginLeft: '-'+$li.width()*index});
            }

            // 通过小图带动大图的切换
            $smallPic.on('mouseenter', 'li', function () {
                $(this).addClass('select').siblings().removeClass('select');
                $(".jqzoom").attr('src',$(this).find("img").attr("mid"));
                $(".jqzoom").attr('rel',$(this).find("img").attr("big"));

            })






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


            $(".pad1").on("click",function(){
                //存在问题  不跳转
                if($(".cco ul li").length!=0){
                    location.href="index3.html";
                }

            })

            $(".pad1_bor div").on("click",function(){
                if($(".cco ul li").length!=0){
                    $(this).css("background","#FF5482");
                    location.href="index3.html";
                }

            })

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
                //$(window).scrollTop(0);    //瞬间弹到顶部
                $("html").animate({scrollTop:0});
            })



            $(".car").on("mouseover", function () {
                $(".car_box").show();
            }).on("mouseout", function () {
                $(".car_box").hide();
            })

            //返
            $(".txt1_r").on("mouseover",function(){
                  $(".txt1_box").show();
            }).on("mouseout",function(){
                  $(".txt1_box").hide();
            })


            //尺码
            $(".look").on("click",function(){
                $(".hidden").show();
                $(".chima").show();
            })
            $(".clo").on("click",function(){
                $(".hidden").hide();
                $(".chima").hide();
            })

            //颜色
            var cor1=false,cor2=false;
            var $txt3_con=$(".txt3_con");
            var $color;
            $txt3_con.on("mouseover",function(){
                $(this).css("border","2px solid #FF5490");

            }).on("mouseout",function(){
                $(this).css("border","2px solid #ccc");
            })

            $txt3_con.on("click",function(){
              $(this).css({"background":"#FF5482"}).siblings($txt3_con).css("background","white");
                $color=$(this).children("span").html();
                cor1=true;
            })
            //尺码
            var $txt4_right=$(".txt4_right ul li");
            var $size;
            $txt4_right.on("mouseover",function(){
                $(this).css("border","1px solid #FF5490");

            }).on("mouseout",function(){
                $(this).css("border","1px solid #ccc");
            })
            $txt4_right.on("click",function(){
                $(this).css({"background":"#FF5482"}).siblings("li").css("background","white");
                $size=$(this).html();
                cor2=true;
            })



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





            //数量
            var $reduce=$(".txt5_one");
            var $add=$(".txt5_two");
            var $num=$(".txt5_five");
            var num=$num.html();

            $reduce.on("click",function(){
                if(num==1){
                    $(this).css("background","#E3E3E3");
                    return;
                }
                num--;
                $num.html(num);
            })

            $add.on("click",function(){
                if(num==10){
                    $(this).css("background","#E3E3E3");
                    return;
                }
                num++;
                $num.html(num);
            })


            //倒计时
            var $spanss=$(".time_title span");
            setInterval(function(){
                var enddate=new Date("2016/10/1 00:00:00");
                var begindate=new Date();
                var seconds=(enddate.getTime()-begindate.getTime())/1000;//把毫秒转换成秒
                $spanss.eq(0).html(parseInt(seconds/3600/24));
                $spanss.eq(1).html(parseInt((seconds/3600)%24));
                $spanss.eq(2).html(Math.floor(seconds/60%60));
                $spanss.eq(3).html(Math.ceil(seconds%60));
            },1000)

            //4个楼层
            var $conlist2_nav=$(".conlist2_nav");
            var $loulis=$(".conlist2_nav ul");
            var $lous=$(".louceng00");
            var $h3=$(".conlist2_left>h3");
            $loulis.on("click","li",function(){
                var dg=$lous.eq($(this).index()).offset().top-$h3.height()-$conlist2_nav.height()-20;
                $("html").animate({scrollTop:dg});
            })

            //导航条
            var $louceng=$(".louceng");
            var $nav2_top=$conlist2_nav.offset().top;
            var $nav_rig=$(".nav_rig");

            $(window).on("scroll",function(){
                var scr = $(window).scrollTop();
                if (scr >=$nav2_top) {
                    $conlist2_nav.css({
                        "position": "fixed",
                        "background": "white",
                        "top": 0
                    });
                    $louceng.css("marginTop",44);
                    $nav_rig.show();
                }
                else {
                    $conlist2_nav.css("position","static");
                    $louceng.css("marginTop", 0);
                     $nav_rig.hide();
                }
            })



            var $pad1_txt=$(".pad1_txt");
            var $txt6=$(".txt6");
            var $ccoul=$(".cco ul");
            var $ccodiv=$(".cco>div");
            var $n=$(".pad1_box>p");
            var $money=$(".pad1_bol span");
            var money=0;

            var $pad1=$(".pad1");
            var $Img=$(".con1_to a img");
            var $conlist1_right=$(".conlist1_right h3 strong");


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
            }

            $txt6.on("click",function(){
                console.log(cor1,cor2);
                if(cor1==false || cor2==false){
                    $(".txt0").show();
                }else{
                    $(".txt0").hide();
                    //飞向购物车

                    var $copyimg=$Img.clone();

                    $copyimg.css({'position': 'absolute',
                        'left': $txt6.offset().left+$txt6.width()/2,
                        'top': $txt6.offset().top-$txt6.height()/2,
                        'width': 50,
                        "height":50});

                    $copyimg.appendTo('body');
                    //动态
                    $copyimg.animate({left: $txt6.offset().left+$txt6.width()/2, top: $txt6.offset().top-$txt6.height()/2-50}, 1000, function() {
                        $copyimg.animate({left: $pad1.offset().left, top: $pad1.offset().top, width:0, opacity: 0}, 2000, function() {
                            $copyimg.remove();
                        });
                    });
                    carCar();
                    takeInt();
                }
            })
            function carCar(){
                $ccodiv.html("");
                var json1={};

                json1.title=$conlist1_right.html();
                json1.img=$Img.attr("src");
                json1.price=$(".fir strong").html();
                json1.color=$color;
                json1.size=$size;
                json1.numb=num;

                listarr.push(json1);
                console.log(listarr);
                carobj.content=listarr;
                // 获取存储到cookie的值，取出来是json不能直接操作，转成对象才能进行下面处理
                var json=JSON.stringify(carobj);

                $.cookie("array",json);

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




        },
        init:function(){
            this.eventBind();
            this.ajax();
        }
    }

    // 初始化
    cont.init();
})