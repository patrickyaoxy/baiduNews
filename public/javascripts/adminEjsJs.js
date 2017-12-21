$(function () {
    //数据的展示的函数
    function xssj() {
        $.ajax({
            url: "/admin/getMessage",
            type: 'post',
            success: function (data) {
                data.forEach(function (key, index) {
                    //渲染所有的数据
                    $(`<tr><td><span class="wrap">${key.id}</span></td>
                 <td><span class="wrap" title=${key.imgs}>${key.imgs}</span></td>
                 <td><span class="wrap" title=${key.title}>${key.title}</span></td>
                 <td><span class="wrap">${key.time}</span></td>
                 <td><span class="wrap">${key.comefrom}</span></td>
                 <td><span class="wrap">${key.type}</span></td>
                 <td><span class="wrap">${key.import}</span></td>
                  <td><span class="wrap"><a class="deleteDate" data-key="${key.id}" data-toggle="modal" data-target="#myModal1">删除</a><a data-key="${key.id}"  class="dataUpdate">更改</a></span></td></tr>`).appendTo($("#shuju"));

                })
            },
            error: function (res) {
                console.log(res);
            }
        })
    }

    xssj();
    //新闻数据的添加
    $("#tijiao").click(function () {

        //判断数据的有效性
        var flag = $("#inputUrl").val() === "" || $("#inputTitle").val() === "" || $("#inputDate").val() === "" || $("#inputFrom").val() === ""
        if (flag) {
            alert("有必填的数据为空！！！")
        } else {
            $.ajax({
                url: "/admin/addMessage",
                type: 'post',
                data: {
                    "imgs": $("#inputUrl").val(),
                    "title": $("#inputTitle").val(),
                    "time": $("#inputDate").val(),
                    "comefrom": $("#inputFrom").val(),
                    "type": $("#inputType").val(),
                    "import": $("#inputTiShi").val()
                },
                success: function (data) {
                    if (data.states === "ok") {
                        //先清空，后增加
                        $("#shuju").html("");

                        xssj();
                        //提示信息
                        $(".cg").stop().fadeIn(500).fadeOut(1000);
                        //清空填写数据
                        $("#inputUrl").val("")
                        $("#inputTitle").val("")
                        $("#inputDate").val("")
                        $("#inputFrom").val("")

                    }
                },
                error: function (res) {
                    console.log(res);
                }
            })
        }
    })
    //新闻数据的删除
    $("body").on("click", ".deleteDate", function () {
        var $del = $(this).parent().parent().parent();
        var $data = $(this).data("key");
        //防手欠
        $("body").on("click", "#deleteThis", function () {
            $.ajax({
                url: "/admin/deleteMessage",
                type: 'post',
                data: {"id": $data},
                success: function (data) {
                    if (data.states === "ok") {
                        //提示已经删除
                        $("#myModal1 h3").text(data.message);
                        $("#myModal1 h3").css({color: "rgba(0,255,0,.6)"})
                        setTimeout(function () {
                            $("#cancelDelete").trigger("click");
                            setTimeout(function () {
                                $("#myModal1 h3").text("确认删除此条新闻吗");
                                $("#myModal1 h3").css({color: "rgba(255,0,0,.6)"})
                            }, 500)
                        }, 500)


                        $del.remove();


                    }
                },
                error: function (res) {
                    console.log(res);
                }
            })
        })
    })
    var $id = null;
    //新闻数据的更新
    $("body").on("click", ".dataUpdate", function () {
        //要修改的内容同步到表单中
        var $del = $(this).parent().parent().parent();
        var $val = $del.children().children(".wrap");
        $id = $(this).data("key");
        $("#inputUrl").val($val.eq(1).text())
        $("#inputTitle").val($val.eq(2).text())
        $("#inputDate").val($val.eq(3).text())
        $("#inputFrom").val($val.eq(4).text())
        $("#inputType").val($val.eq(5).text())
        $("#inputTiShi").val($val.eq(6).text())

        //隐藏提交按钮，减少重复提交相同新闻造成的冗余
        $("#tijiao").css({display: "none"});
        $("#xiugai").css({display: "block"});
    })
//更改数据
    $("#xiugai").click(function () {
        $.ajax({
            url: "/admin/updateMessage",
            type: 'post',
            data: {
                "id": $id,
                "imgs": $("#inputUrl").val(),
                "title": $("#inputTitle").val(),
                "time": $("#inputDate").val(),
                "comefrom": $("#inputFrom").val(),
                "type": $("#inputType").val(),
                "import": $("#inputTiShi").val()
            },
            success: function (data) {
                if (data.states === "ok") {
                    $("#shuju").html("");
                    xssj();
                    $(".xg").stop().fadeIn(500).fadeOut(1000);
                    //按钮恢复
                    $("#tijiao").css({display: "block"});
                    $("#xiugai").css({display: "none"});
                    //清空填写数据
                    $("#inputUrl").val("")
                    $("#inputTitle").val("")
                    $("#inputDate").val("")
                    $("#inputFrom").val("")
                }
            },
            error: function (res) {
                console.log(res);
            }
        })

    })


})