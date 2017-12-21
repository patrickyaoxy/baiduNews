$(function () {
    //下拉菜单
    var flag = true;
    $(".more").on("touchstart", function () {
        if (flag) {
            $(".menus").css({width: "100%", height: "120px"})
            $(".i").css({backgroundPosition: "0 -16px"})
            $(".lgrad").css({display: "none"})
            $(".rgrad").css({display: "none"})
            $(".menus").css({marginLeft: "0"});
            flag = false;

        } else {
            $(".menus").css({width: "3000px", height: "40px"})
            $(".i").css({backgroundPosition: "-16px -16px"})
            $(".lgrad").css({display: "block"})
            $(".rgrad").css({display: "block"})
            flag = true;

        }


    })
    //导航栏前的模糊消失效果
    mhxs();

    function mhxs() {
        var $m = $(".menus").offset().left;
        if ($m < 0) {
            $("#lgrad").css({display: "block"})

        } else {
            $("#lgrad").css({display: "none"})
        }
    }

    //导航栏点击居中
    $(".menus li").on("touchstart", function (e) {
        $(".menus").css({width: "3000px", height: "40px"})
        $(".i").css({backgroundPosition: "-16px -16px"})
        $(".lgrad").css({display: "block"})
        $(".rgrad").css({display: "block"})
        $(this).children("a").addClass("bb");
        $(this).siblings().children("a").removeClass("bb");
        var $x = $(this).position().left;
        if ($x > 160) {
            $(".menus").css({marginLeft: -$x + 170 + "px"});
        }
        flag = true;
        mhxs();
        var s = e.touches[0].screenX;
        var $mrg = $(".menus").offset().left
        //导航栏的滑动效果
        $(".menus li").on("touchmove", function (e) {
                var end = e.touches[0].screenX;
                var res = end - s;
                $(".menus").css({marginLeft: $mrg + res + "px"});
        })
        //范围控制
        $(".menus li").on("touchend", function (e) {
            var $mrgnow = $(".menus").offset().left;
            if ($mrgnow >0) {
                $(".menus").css({marginLeft: "0"})
            }else if($mrgnow <-600){
                $(".menus").css({marginLeft: "-510px"})
            }
        })
    })
    //模板拼接+选项卡
    //选项卡
    var ary=['recommend', 'baijia', 'local', 'entertainment', 'society', 'military', 'women', 'funny', 'internet', 'technology','life']
    ary.forEach(function (key,index) {
        muban(key,index)
    })
    $(".menus li").on("touchstart",function () {
        var ind=$(this).index();
        $('section').eq(ind).addClass("active1").siblings().removeClass("active1")
    })

    // muban('recommend');






    function muban(fenlei,ind) {
        $.ajax({
            url: "/admin/getMessage",
            type: 'post',
            success: function (data) {
                var flag=true;
                data.forEach(function (key, index) {

                    if(flag&&(key.type===fenlei)){
                        var str = `<div class="${key.type}">
<div id="${key.type}" class="carousel slide mb" data-ride="carousel">
<ol class="carousel-indicators cont">
            <li data-target="#${key.type}" data-slide-to="0" class="active"></li>
            <li data-target="#${key.type}" data-slide-to="1"></li>
            <li data-target="#${key.type}" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner dx ${key.type}${key.type}" role="listbox">
        </div>
</div></div>`
                        $('section').get(ind).innerHTML += str;
                        flag=false;
                    }
                    if((key.import==="lunbo")&&(key.type===fenlei)){
                        var str2=`<div class="item dx">
                <img src="${key.imgs}">
                <div class="carousel-caption btwz">
                    ${key.title}
                </div>
            </div>`
                        $("."+key.type+key.type).get(0).innerHTML +=str2;
                    }else if((key.import!=="lunbo")&&(key.type===fenlei)){
                        var str3=`<dl>
            <dt><img src="${key.imgs}"></dt>
            <dd>
                <div><h4>${key.title}</h4></div>
                <p><span>${key.comefrom}</span><b class="${key.import}">热点</b><i>${key.time}</i></p>
            </dd>
        </dl>`
                        $("."+key.type).get(0).innerHTML+=str3
                    }
                    $("#"+key.type+"  .item").eq(0).addClass("active");
                    //重启bootstrap轮播
                    $(' .carousel').carousel({"interval": 4000})
                })
            }
        })



    }


})