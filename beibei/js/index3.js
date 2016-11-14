/**
 * Created by Administrator on 2015/9/7.
 */
/*
 * @liyan
 * emil
 * */
$(function(){
    var bei2={
        ajax: function (){

        },
        eventBind:function(){
            if($.cookie("array")==undefined){
                $(".empty").show();
                $(".full").hide();
            }
            //请登录  用户名
            var $zhuce=$(".zhuce");
            var $loge=$(".loge");
            if($.cookie("username")){
                $loge.html($.cookie("username"));
                $zhuce.html("[退出]");
                $zhuce.on("click",function(){
                    location.href="index1.html";
                })
            }else{
                location.href="index1.html";
            }
          //购物车的取值
            var json2=$.parseJSON($.cookie("array"));
            var jso=json2.content;
            if(jso){
                $(".empty").hide();
                $(".full").show();
                //取值
                var _html = "";
                for(var i=0;i<jso.length;i++){
                    _html+='<li class="clearfix">';
                    _html+="<input type='checkbox'>";
                    _html+='<img src="'+jso[i].img+'">';
                    _html+='<div class="full_div1">'+jso[i].title+'</div>';
                    _html+='<div class="full_div2"><p>'+"颜色："+jso[i].color+'</p>';
                    _html+='<div>'+" 尺码："+jso[i].size+'</div></div>';
                    _html+='<div class="full_div3"><p>'+jso[i].price+'</p><div>'+"219.00"+'</div></div>';
                    _html+='<div class="full_div4 clearfix"><span class="full_one">'+'-'+'</span><span class="full_two">'
                        +jso[i].numb+'</span><span class="full_three">'+'+'+'</span></div>';
                    _html+='<span class="full_four">'+jso[i].price*jso[i].numb+'.00'+'</span><span class="full_five">'+"删除"+'</span>';
                   _html+='</li>';
                }

                //$ccoul.html(list);
                $(_html).appendTo($(".lis"));
            }else{
                $(".empty").show();
                $(".full").hide();
            }


            //全选
            var $li1_input=$(".li1 input");
            var $full_footer=$(".full_footer input");
            if($li1_input.prop("checked")){
                $("input:checkbox").prop("checked", true);
            }
            $li1_input.on("click",function(){
                if($(".li1 input").prop("checked")){
                    $("input:checkbox").prop("checked", true);
                    jisuan();
                }else{
                    $("input:checkbox").prop("checked", false);
                    jisuan();
                }
            })


            $full_footer.on("click",function(){
                if($(".full_footer input").prop("checked")){
                    $("input:checkbox").prop("checked", true);
                    jisuan();
                }else{
                    $("input:checkbox").prop("checked", false);

                }
            })

            //(改进)
            var $full_tit=$(".full_tit");
            $full_tit.on("click","input",function(){
                if($(this).prop("checked")==true){
                    $(".lis input:checkbox").prop("checked",true);
                    $(".full_footer input").prop("checked",true);
                    $(".li1 input").prop("checked",true);
                }else{
                    $(".lis input:checkbox").prop("checked",false);
                    $(".full_footer input").prop("checked",false);
                    $(".li1 input").prop("checked",false);
                }
            })
            $(".lis :checkbox").click(function(){
                var chknum = $(".lis input:checkbox").size();
                var chk = 0;
                $(".lis input:checkbox").each(function () {
                    if($(this).prop("checked")==true){
                        chk++;
                    }
                });
                if(chknum==chk){
                    $(".full_footer input").prop("checked",true);
                    $(".li1 input").prop("checked",true);
                    $(".full_tit input").prop("checked",true);
                }else{
                    $(".full_tit input").prop("checked",false);
                    $(".full_footer input").prop("checked",false);
                    $(".li1 input").prop("checked",false);
                }
            });

            //数量的增减- +
                 jisuan();

                $("input:checkbox").on("click",function(){
                    jisuan();
                })

                 $(".full_one").on("click",function(){
                     var idxs=$(this).parent().parent().index();
                     var inge=$(".full_one").eq(idxs).siblings(".full_two").html();
                    if(inge==1){
                        $(this).css("background","#E3E3E3");
                        return;
                    }
                     $(this).css("background","white");
                    inge--;
                     $(".full_two").eq(idxs).html(inge);
                     var zong=$(".full_div3 p").html()*inge;
                     $(".full_four").eq(idxs).html(zong+".00");
                       jisuan();
                 })
                $(".full_three").on("click",function(){
                    var idxs=$(this).parent().parent().index();
                    var inge=$(".full_one").eq(idxs).siblings(".full_two").html();

                    inge++;
                    if(inge==20){
                        $(this).css("background","#E3E3E3");
                        return;
                    }
                    $(this).css("background","white");
                    $(".full_two").eq(idxs).html(inge);
                    var zong=$(".full_div3 p").html()*inge;
                    $(".full_four").eq(idxs).html(zong+".00");

                    jisuan();
                })



            //小计
           function jisuan(){
               var $zongjia=$(".zongjia");
               var integer1= 0,integer2=0;
               var $suan=$(".suan");
               $.each($(".full_four"),function(idx,ele){
                   if($(".lis li input").eq(idx).prop("checked")){
                               console.log(integer2);
                               var inner=Number($(".full_four").eq(idx).html());
                               var nummb=Number($(".full_two").eq(idx).html());
                               integer1+=inner;
                               integer2+=nummb;
                           }
               })

               //注释的地方有错误  待查找
               //for(var m=0;m<$(".full_four").length;m++){
               //    if($(".lis li input").eq(m).prop("checked")){
               //        console.log(integer2);
               //        var inner=Number($(".full_four").eq(m).html());
               //        var nummb=Number($(".full_two").eq(m).html());
               //        var $suan=$(".suan");
               //        integer1+=inner;
               //        integer2+=nummb;
               //    }
               //}

               $suan.html(integer1+".00");
               $zongjia.html(integer1+".00");
               console.log(integer2);
               $(".spa span").html(integer2);
           }



            //全选删除(改进)
            $(".clea").on("click",function(){
                $(".clea_box").show();
                $(".hiddeen").show();
                $(".tru").on("click",function(){
                    if($full_footer.prop("checked")){
                        var inn=$(".lis input:checkbox").size();
                        var json15=$.parseJSON($.cookie("array"));
                        var jss=json15.content;
                        jss.splice(0,inn);
                        $(".empty").show();
                        $(".full").hide();
                        $(".clea_box").hide();
                        $(".hiddeen").hide();
                        var j=JSON.stringify(json15);
                        $.cookie("array",j);
                    }else{
                        $(".clea_box").hide();
                        $(".hiddeen").hide();
                    }
                })

            })

              //确定按钮
                $(".tru").on("mouseover",function(){
                    $(this).css("opacity","0.5");
                }).on("mouseout",function() {
                    $(this).css("opacity", "1");
                })

            //取消按钮
                $(".resu").on("click",function(){
                    $(".clea_box").hide();
                    $(".hiddeen").hide();
                })

            //单个列表删除
            if($(".lis li").length!=0){
                $(".lis li .full_five").on("click",function(){
                    $(".clea_box").show();
                    $(".clea_tit").html("确认要删除该商品吗?");
                    $(".hiddeen").show();
                    var inn=$(this).parent().index();
                    var json15=$.parseJSON($.cookie("array"));
                    var jss=json15.content;
                    jss.splice(inn,1);

                    $(".tru").on("click",function(){
                        var j=JSON.stringify(json15);
                        console.log(j);
                        $.cookie("array",j);

                        $(".clea_box").hide();
                        $(".hiddeen").hide();
                        location.href="index3.html";
                    })
                })
            }else{
                $(".empty").show();
                $(".full").hide();
            }




        },
        init:function(){
            this.eventBind();
        }

    }
    bei2.init();
})