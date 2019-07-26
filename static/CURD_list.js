(function () {    //自执行函数封装，下面有一个jquery扩展调用接口
    var requestUrl = null;
    var backUrl = null;

    //返回上一级
    function bindBack() {
           $("#idBack a").prop("href",backUrl)
    }

    //刷新（重新加载）
    function bindReload() {
        $("#idReload").click(function () {
            console.log(9999999999999)
            $.ajax({
                url: requestUrl,
                method: "GET",
                data: {"id":''},
                dataType: "JSON",
                success: function (result) {
                    //arg是字符串
                    if (result.status == "False") {
                    } else {
                        $("#table_th").empty();
                        $("#table_td").empty();
                        global_dict(result.global_dict);  //顺序问题要注意
                        table_head(result.table_config);
                        table_body(result.table_config, result.table_list,);
                        initPager(result.page_obj);
                        //这里太太太牛逼了
                    }
                }
            })
        })
    }

    function bindChangePager() {
        $("#pager").on('click', 'li', function () {
            var num = $(this).children().text();
            console.log(num);
            init(num)
        })

        // $("a").click(function () {
        //     alert("hhhhhhhhhhhhhh")
        //     var num = $(this).text();
        //     console.log(num);
        //     init(num)
        // })
    }

    //页面上批量删除按钮事件

    //绑定主页面查找按钮事件
    function bindSeek() {
        $("#idSeek").click(function () {
            var $form_horizontal = $("#seekForm");
            $($form_horizontal).empty();
            $.each(table_config, function (k2, v2) {
                // var editChoices = $(this).attr("edit-choices");
                if (v2["display"]) {
                    if (v2['attrs']["edit-enable"]) {
                        if (v2['attrs']["edit-type"] == 'input') {
                            var $div_father = document.createElement('div');
                            $($div_father).addClass("form-group");
                            $form_horizontal.append($div_father);
                            //<label for="name" class="col-sm-2 control-label">学号</label>
                            var $label_son = document.createElement('label');
                            $($label_son).addClass("col-sm-2 control-label");
                            $($label_son).html(v2["title"]);
                            $div_father.append($label_son);
                            var $div_son = document.createElement('div');

                            $($div_son).addClass("col-sm-10");
                            $div_father.append($div_son);
                            var $add = document.createElement('input');
                            $add.setAttribute("name", v2['attrs']["name"])
                            $($add).html(v2.title);
                            $div_son.append($add);
                        }
                        if (v2['attrs']["edit-type"] == 'select') {
                            var $div_father = document.createElement('div');
                            $($div_father).addClass("form-group");
                            $form_horizontal.append($div_father);
                            //<label for="name" class="col-sm-2 control-label">学号</label>
                            var $label_son = document.createElement('label');
                            $($label_son).addClass("col-sm-2 control-label");
                            $($label_son).html(v2["title"]);
                            $div_father.append($label_son);
                            var $div_son = document.createElement('div');

                            $($div_son).addClass("col-sm-10");
                            $div_father.append($div_son);
                            var $add = document.createElement('select');
                            $add.setAttribute("name", v2['attrs']["name"]);
                            $($add).html(v2.title);
                            $div_son.append($add);
                            var opi = document.createElement('option');
                            opi.value = "";
                            opi.selected = "selected";
                            $(opi).html("可选择");
                            $($add).append(opi);
                            $.each(window[v2["attrs"]['edit-choices']], function (k3, v3) {
                                var op = document.createElement('option');
                                // if (innerSelect == v1[1]) {
                                //     op.selected = 'selected'
                                // }
                                op.value = v3[0];
                                op.innerHTML = v3[1];
                                $($add).append(op);
                            });

                        }
                    }
                }
            });

            $("#seekModal").modal("show")
        })
    }

    //绑定确认查找信息按钮事件
    function bindSeekConfirm() {
        $("#seekConfirmBtn").click(function () {
            var post_data = {};
            console.log(999999999999999999999999)
            $("#seekModal").find("input,select").each(function () {
                v = $(this).val();
                n = $(this).attr("name");
                post_data[n] = v;
                console.log(999999999999999999999999)

            });
            $.ajax({
                url: requestUrl,
                method: "GET",
                data: post_data,
                dataType: "JSON",
                success: function (result) {
                    //arg是字符串
                    if (result.status == "False") {

                        $("#seekerrormsg").text(dict.message)

                    } else {
                        $("#seekModal").modal("hide");
                        $("#table_th").empty();
                        $("#table_td").empty();
                        global_dict(result.global_dict);  //顺序问题要注意
                        table_head(result.table_config);
                        table_body(result.table_config, result.table_list,);
                        initPager(result.page_obj);
                        //这里太太太牛逼了
                    }
                }
            })
        })
    }

    //绑定主页面添加按钮事件
    function bindAdd() {
        $("#idAdd").click(function () {
            var $form_horizontal = $("#addForm");
            $($form_horizontal).empty();
            $.each(table_config, function (k2, v2) {
                // var editChoices = $(this).attr("edit-choices");
                if (v2['attrs']["edit-enable"]) {
                    if (v2['attrs']["edit-type"] == 'input') {
                        var $div_father = document.createElement('div');
                        $($div_father).addClass("form-group");

                        $form_horizontal.append($div_father);
                        //<label for="name" class="col-sm-2 control-label">学号</label>

                        var $label_son = document.createElement('label');
                        $($label_son).addClass("col-sm-2 control-label");

                        $($label_son).html(v2["title"]);
                        $div_father.append($label_son);
                        console.log(99999999999);
                        var $div_son = document.createElement('div');

                        $($div_son).addClass("col-sm-10");
                        $div_father.append($div_son);
                        var $add = document.createElement('input');
                        $add.setAttribute("name", v2['attrs']["name"])
                        $($add).html(v2.title);
                        $div_son.append($add);
                    }
                    if (v2['attrs']["edit-type"] == 'select') {
                        var $div_father = document.createElement('div');
                        $($div_father).addClass("form-group");
                        $form_horizontal.append($div_father);
                        //<label for="name" class="col-sm-2 control-label">学号</label>
                        var $label_son = document.createElement('label');
                        $($label_son).addClass("col-sm-2 control-label");
                        $($label_son).html(v2["title"]);
                        $div_father.append($label_son);
                        var $div_son = document.createElement('div');

                        $($div_son).addClass("col-sm-10");
                        $div_father.append($div_son);
                        var $add = document.createElement('select');
                        $add.setAttribute("name", v2['attrs']["name"]);
                        $($add).html(v2.title);
                        $div_son.append($add);
                        $.each(window[v2["attrs"]['edit-choices']], function (k3, v3) {
                            var op = document.createElement('option');
                            // if (innerSelect == v1[1]) {
                            //     op.selected = 'selected'
                            // }
                            op.value = v3[0];
                            op.innerHTML = v3[1];
                            $($add).append(op);
                        });

                    }
                }

            });

            $("#addModal").modal("show")
        })
    }

    //绑定模态框确认添加按钮事件
    function bindAddConfirm() {
        $("#savebtn").click(function () {
            var post_data = {};
            $("#addModal").find("input,select").each(function () {
                var v = $(this).val();
                var n = $(this).attr("name");
                post_data[n] = v;
            });
            $.ajax({
                url: requestUrl,
                method: "POST",
                data: post_data,
                success: function (arg) {
                    //arg是字符串
                    var dict = JSON.parse(arg); //转成字典
                    if (dict.status) {
                        $("#addModal").modal("hide");
                        alert(dict.message)
                        init(1)
                    } else {
                        $("#adderrormsg").text(dict.message)
                    }
                }
            })
        })
    }

    //绑定主页面批量删除按钮事件
    function bindDel() {
        $("#idDel").click(function () {
            $("#delModal").modal("show");
            // var Nid = $(this).parent().parent().attr("nid");
            // $("#delNid").val(Nid);
            Nid = [];
            $("#table_td").find(':checked').each(function () {
                var $currentTr = $(this).parent().parent()
                var row_id = $($currentTr).attr('row-id');
                Nid.push(row_id)
            })
            $("#delNid").val(Nid);
            console.log(Nid)
        })
    }

    //模态框确认删除按钮事件
    function bindDelconfirm() {
        $("#delconfirm").click(function () {
            // console.log("zzzz");
            // var str = $("#delNid").val();
            // console.log("原来的",typeof str);
            // ID =  eval('(' + str + ')');
            // console.log(ID);
            //
            // console.log(typeof ID);
            $.ajax({
                url: requestUrl,
                method: "DELETE",
                data: {"delNid": JSON.stringify(Nid)},
                success: function (arg) {
                    var dict = JSON.parse(arg);
                    if (dict.status) {
                        //console.log(dict.message);
                        $.each(Nid, function (k, v) {
                            var OID = v;
                            $('tr[row-id="' + OID + '"]').remove();
                        });
                        $("#delModal").modal("hide")
                    } else {
                        $("#delerrormsg").text(dict.message);
                        console.log(dict.message);
                    }


                }
            })

        })

    }

    function bindSave() {
        $("#idSave").click(function () {
            //找到进入过编辑模式的tr ，has-edit='true'
            var postlist = [];
            $("#table_td").find('tr[has-edit="true"]').each(function () {
                //$(this)--->tr
                var temp = {};
                var id = $(this).attr('row-id');
                temp["id"] = id;
                var v = $(this).find('td[edit-enable="true"]').each(function () {
                    //$(this)--->td
                    var name = $(this).attr('name');
                    var old_val = $(this).attr('old_val');

                    var new_val = $(this).attr('new_val');

                    if (old_val != new_val) {
                        temp[name] = new_val

                    }
                });

                postlist.push(JSON.stringify(temp))

                // $.ajax({
                //     url: requestUrl,
                //     type: 'POST',
                //     data: temp,
                //     dataType: 'JSON',
                //     success: function (arg) {
                //         if (arg.status) {
                //
                //         } else {
                //             alert(arg.error)
                //         }
                //     }
                //
                // })
            });
            //window.location.reload()
            $.ajax({
                url: requestUrl,
                type: 'PUT',
                data: {"PostList": JSON.stringify(postlist)},
                //dataType: 'JSON',
                success: function (arg) {
                    var dict = JSON.parse(arg);
                    if (dict.status) {
                        init(1)
                    } else {
                        alert(dict.message)
                    }
                }
            })

        })

    }

    function bindReverseAll() {
        $("#idRerverseAll").click(function () {
            $("#table_td").find(' :checkbox').each(function () {
                if ($("#idEditMode").hasClass("btn-warning")) {
                    if ($(this).prop('checked')) {
                        $(this).prop('checked', false);
                        trOutEditMode($(this).parent().parent())
                    } else {
                        $(this).prop('checked', true);
                        trIntoEditMode($(this).parent().parent())
                    }
                } else {
                    if ($(this).prop('checked')) {
                        $(this).prop('checked', false);
                    } else {
                        $(this).prop('checked', true);
                    }
                }
            })
        })
    }

    function bindCancelAll() {
        $("#idCancelAll").click(function () {
            $("#table_td").find(' :checked').each(function () {
                if ($("#idEditMode").hasClass("btn-warning")) {
                    var $currentTr = $(this).parent().parent();
                    trOutEditMode($currentTr);
                    $(this).prop('checked', false)
                } else {
                    $(this).prop('checked', false)
                }
            })
        })
    }

    function bindCheckAll() {
        $("#idCheckAll").click(function () {
            $("#table_td").find(':checkbox').each(function () {
                //$(this)---->checkbox
                //$(this).prop('checked',true)
                if ($("#idEditMode").hasClass("btn-warning")) {
                    //进入编辑模式
                    if ($(this).prop('checked')) {
                        //当前行已经进入编辑模式，不再重复进入，
                    } else {
                        $(this).prop('checked', 'checked');
                        var $currentTr = $(this).parent().parent();
                        trIntoEditMode($currentTr)
                    }
                } else {
                    $(this).prop('checked', 'checked');
                }
            })
        })
    }

    function bindEditMode() {                      //编辑按钮出发
        $("#idEditMode").click(function () {
            var editing = $(this).hasClass("btn-warning");  //根据颜色判断状态
            if (editing) {
                $(this).removeClass("btn-warning");//去颜色  退出编辑模式
                $(this).text("进入编辑模式");
                $("#table_td").find(':checked').each(function () {  //找到所以被选中的checkbox循环函数
                    var $currentTr = $(this).parent().parent();  //this是每一个被选中的checkbox,找到tr

                    trOutEditMode($currentTr)
                });
            } else {
                $(this).addClass("btn-warning");  //bootscrap 加颜色  进入编辑模式
                $(this).text("退出编辑模式");
                $("#table_td").find(':checked').each(function () {  //找到所以被选中的checkbox循环函数
                    var $currentTr = $(this).parent().parent();  //this是每一个被选中的checkbox


                    trIntoEditMode($currentTr)

                });
            }

        })
    }

    function bindCheckbox() {                    //checkbox出发
        $("#table_td").on('click', ':checkbox', function () {    //事件委托绑定*****
            if ($("#idEditMode").hasClass("btn-warning")) {
                var ck = $(this).prop("checked");    //获取checkbox固有属性值 ，证明是选中先执行
                var $currentTr = $(this).parent().parent();  //向上找标签
                if (ck) {                     //进入编辑模式

                    trIntoEditMode($currentTr)
                } else {                        //退出编辑模式

                    trOutEditMode($currentTr)
                }
            }

        })
    }

    function trOutEditMode($tr) {   //退出编辑模式
        $tr.removeClass('success');  //给退编辑列去掉背景颜色,$currentTr是标签
        $tr.children().each(function () {    //children 只找一代，find（"td"）全部都找

            var editEnable = $(this).attr('edit-enable');      //获取自定义属性用attr
            var editType = $(this).attr('edit-type');
            var editChoices = $(this).attr("edit-choices");
            if (editEnable == "true") {    //可以退出编辑模式
                if (editType == "input") {    //进入编辑模式的input
                    var $input = $(this).children().first(); //找到编辑模式下的input框
                    var teg = $input.val();  //获取input框的值
                    $(this).attr('new_val', teg);
                    $(this).html(teg);   //填充标签内容
                } else if (editType == "select") {
                    var $innerSelect = $(this).children().first();
                    // {#var sel=$innerSelect.val();#}
                    //     {#$.each(window[editChoices],function (k1,v1) { //第一种方法#}
                    //     {#//取select标签中被选中的option文本内容#}
                    //     {#    if(sel==v1[0]){#}
                    //     {#        ipt=v1[1]#}
                    //     {#    }#}
                    //     {# } );#}
                    //第二中方法直接取到select标签中被选中的option的文本信息
                    var ipt = $innerSelect[0].selectedOptions[0].innerHTML;
                    //这一句顶上面5，6句
                    $(this).html(ipt);
                    var new_val = $(this).text();
                    $(this).attr('new_val', new_val);
                }
            }
        })
    }

    function trIntoEditMode($tr) {  //$tr 前面加$代表的是一个标签 进入编辑模式
        $tr.attr('has-edit', 'true');   //给保存找作用对象用的
        $tr.addClass('success');  //给要编辑的列加上背景颜色,$currentTr是标签
        $tr.children().each(function () {    //children 只找一代，find（"td"）全部都找

            var editEnable = $(this).attr('edit-enable');      //获取自定义属性用attr
            var editType = $(this).attr('edit-type');
            var editChoices = $(this).attr("edit-choices");
            if (editEnable == "true") {    //可以进入编辑模式
                if (editType == "input") {    //进入编辑模式的input方式
                    var innerText = $(this).text();
                    $(this).attr("old_val", innerText);
                    var tag = document.createElement('input');

                    //tag.type="text";
                    //<input type="text" value="lalalal">
                    tag.className = "form-control";   //btscrap加样式
                    tag.value = innerText;
                    $(this).html(tag)   //把td的文本内容换成input标签
                } else if (editType == "select") {
                    /*
                          <select name="" id="">
                              <option value="0">女</option>
                              <option value="1">男</option>
                              <option value="2">null</option>
                           </select>
                     */
                    var innerSelect = $(this).text();
                    $(this).attr("old_val", innerSelect);
                    var sel = document.createElement('select');
                    sel.className = "form-control";   //生成一个样式

                    $.each(window[editChoices], function (k1, v1) {
                        var op = document.createElement('option');
                        if (innerSelect == v1[1]) {
                            op.selected = 'selected'
                        }

                        op.value = v1[0];
                        op.innerHTML = v1[1];
                        $(sel).append(op);
                    });
                    $(this).html(sel);

                }
            }
        })
    }

    function init(pager) {          //从后台取数据//pager
        $.ajax({
            url: requestUrl,
            type: "GET",
            dataType: "JSON",
            data: {"pager": pager},
            success: function (result) {
                // console.log(result)
                // var result=result["result"];
                // result=JSON.parse(result);

                global_dict(result.global_dict);  //顺序问题要注意
                table_head(result.table_config);
                table_body(result.table_config, result.table_list,);
                initPager(result.page_obj);

            },
        })
    }

    function initPager(pager) {
        $("#pager").html(pager)
    }

    function global_dict(global_dict) {    //处理全局变量
        $.each(global_dict, function (k, v) {
            window[k] = v                //创建全局变量的一种方式
        })
    }

    function table_head(table_config) {     //设置表头
        var tr = document.createElement("tr");
        $("#table_th").empty();
        $("#table_th").append(tr);
        $.each(table_config, function (k, items) {
            if (items.display) {
                var th = document.createElement("th");
                th.innerHTML = items.title;
                $(tr).append(th)
            }
        })
    }

    function table_body(table_config, table_list) {     //设置表内容
        $("#table_td").empty();
        $.each(table_list, function (k, item) {
            var tr = document.createElement("tr");
            tr.setAttribute('row-id', table_list[k].id);// 给保存功能寻找对象用的,找到要更新的行
            $.each(table_config, function (i, kemt) {
                if (kemt.display) {
                    var td = document.createElement("td");
                    td.setAttribute('name', table_config[name]);// 找到要更新的行中的要更新的td
                    if (kemt.field == null) {               //操作字段
                        var a = document.createElement("a");
                        // var b = document.createElement("a");
                        a.innerText = "查看详细  ";
                        a.href = "/assetdetail-" + item.id;
                        // b.innerText = "   删除   ";
                        // b.href = "/assetdetail-" + item.id;
                        $(td).append(a);
                        // $(td).append(b)
                    } else if (kemt.field == "gender") {  //选择字段
                        td.innerHTML = gender_choices[item[kemt.field]][1];
                    } else if (kemt.field == "firstcol") {  //    勾选栏字段
                        var c = document.createElement("input");
                        c.type = "checkbox"
                        $(td).append(c);
                    }
                    // {#else if (kemt.field == "cls") {     //跨表字段 ForeignKey#}
                    // {#    $.each(cls_choices, function (k, v) {#}
                    // {#        if (v[0] == item[kemt.field]) {#}
                    // {#            td.innerHTML = v[1];#}
                    // {#            return#}
                    // {#        }#}
                    // {#    })#}
                    // {# } #}
                    else {                             //基本字段
                        td.innerHTML = item[kemt.field];
                    }

                    $.each(kemt.attrs, function (c, b) {  //上面根据情况生成td标签，这里统一根据配置加行属性
                        td.setAttribute(c, b)
                    });
                    $(tr).append(td)
                }
            });

            $("#table_td").append(tr)
        })
    }


    jQuery.extend({       //jquery的扩展方法，给外部调用
        "Api": function (geturl,burl) {
            requestUrl = geturl;
            backUrl = burl;
            init();            //ajax GET请求后台取数据    success函数里面又自动调用了三个函数
            bindEditMode();    //编辑模式按钮事件
            bindCheckbox();    //单个按钮事件
            bindCheckAll();  //全选按钮事件
            //trIntoEditMode,trOutEditMode分别是两个进入及退出编辑模式的处理函数，被内部调用
            bindCancelAll();   //取消按钮事件
            bindReverseAll();  //反选按钮事件
            bindSave();        //保存按钮事件

            bindDel();           //批量删除按钮事件
            bindDelconfirm();     //批量删除确认按钮点击事件
            bindAdd();           //页面添加按钮事件
            bindAddConfirm();    //添加确认按钮点击事件
            bindSeek();          //页面查找按钮点击事件
            bindSeekConfirm();   //确认查找按钮事件
            bindChangePager();   //页码数点击事件
            bindReload();        //页面刷新按钮事件 （重新加载）
            bindBack();          //页面返回按钮事件  （返回上一级）


        },
        // 'changePager': function (num) {
        //     init(num);
        // }
    })
})();