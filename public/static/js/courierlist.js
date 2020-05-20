layui.extend({
    admin: '{/}../../static/js/admin'
});

layui.use(['table', 'jquery','form', 'admin'], function() {
    var table = layui.table,
        $ = layui.jquery,
        form = layui.form,
        admin = layui.admin;
    var loading = layer.load();
    table.render({
        elem: '#courier',
        toolbar: '#toolbarDemo',
        url: '/courier/index/info',
        cols: [
            [
                {type: 'checkbox', fixed: 'left'},
                 {field: 'pid',title: '排序',sort: true,width:70,align:'center'},
               {field: 'create_time',title: '创建时间',width:120,align:'center'},
                {field: 'a_name',title: '活动名称',width:150},
                {field: 'book_seller',title: '书商',align:'center',width:90},
                {field: 'book_prices',title: '单价',width:70,align:'center'},
                {field: 'countActvi',title: '发书人数',sort: true,width:120,align:'center'},
                {field: 'book_money',title: '发书金额',sort: true,width:100,align:'center'},
                {field: 'inve_num',title: '当前目标人数',align:'center',width:100},
                {field: 'rd_inve_num',title: '实际邀请人数',align:'center',width:100},
                {field: 'realInve_num',title: '剩余人数',align:'center',width:100},
                {field: 'costPrice',title: '实际成本',align:'center',sort: true,width:100},
                {field: 'takeOff',title: '取关率',align:'center',sort: true,width:100},
                {field: 'InviOff',title: '邀请率',align:'center',sort: true,width:100},
                {field: 'firstRate',title: '第一次领书率',sort: true,align:'center',width:100},
                {field: 'operate',title: '操作',toolbar: '#operateTpl',unresize: true,align:'center',width:100}
            ]
        ],
        id: 'reload',
        done: function(){
        layer.close(loading);
    }
    });
    //监听表格复选框选择
    table.on('checkbox(test)', function(obj){
        console.log(obj)

    });


    // table.on('toolbar(test)', function(obj){
    //     console.log(12321);
    //     return false;
    //     var checkStatus = table.checkStatus(obj.config.id);
    //     switch(obj.event){
    //         case 'getCheckData':
    //             var data = checkStatus.data;
    //             layer.alert(JSON.stringify(data));
    //             break;
    //         case 'getCheckLength':
    //             var data = checkStatus.data;
    //             layer.msg('选中了：'+ data.length + ' 个');
    //             break;
    //         case 'isAll':
    //             layer.msg(checkStatus.isAll ? '全选': '未全选')
    //             break;
    //     };
    // });

    /*
     *数据表格中form表单元素是动态插入,所以需要更新渲染下
     * http://www.layui.com/doc/modules/form.html#render
     * */
    $(function(){
        form.render();
    });

    //form监听事件
    form.on('checkbox(lockDemo)', function(obj){
        if(obj.elem.checked==true)
        {
            var status=1;
        }else{
            var status=0;
        }

        $.ajax({
            type:'post',
            url:'/member/index/edit',
            data:{id:obj.value,status:status},

            success:function(res){
                if(res.code==1){
                    layer.msg(res.msg,{icon: 1,time: 1000});
                    return false;
                }
                layer.msg(res.msg,{icon:9});
            },
        });
    });


    var active = {

        //搜索
        reload: function(){
            // var demoReload = $('#demoReload');

            //执行重载
            table.reload('Reload', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }
                ,where: {
                    keyword: $('#keyword').val(),
                    // a_id: $('#actionReload').val()
                }
            });
        },

        // getCheckData: function(){ //获取选中数据
        //     var checkStatus = table.checkStatus('courier')
        //         ,data = checkStatus.data;
        //     layer.alert(JSON.stringify(data));
        // },


        getCheckData: function() { //获取选中数据
            var loading = layer.load();
            var checkStatus = table.checkStatus('reload'),
                data = checkStatus.data;
           // layer.alert(JSON.stringify(data));
           //  return false;
            if(data.length > 0) {
                layer.open({
                    id:1,
                    type: 1,
                    title:'单号名称',
                    skin:'layui-layer-rim',
                    area:['450px', 'auto'],

                    content: ' <div class="row" style="width: 420px;  margin-left:7px; margin-top:10px;">'
                        +'<div class="col-sm-12" style="margin-top: 10px">'
                        +'<div class="input-group">'
                        +'<span class="input-group-addon">单号名称</span>'
                        +'<input id="odd_name" type="text" class="layui-input" placeholder="请输入名称">'
                        +'</div>'
                        +'</div>'
                        +'</div>'
                    ,
                    btn:['保存','取消'],
                    btn1: function (saveindex,layero) {
                        var odd_name=$('#odd_name').val();
                        if (odd_name==='') {
                            layer.msg('请输入名称哦');
                            return false;
                        }
                        //关闭当前弹出层
                        layer.close(saveindex);
                        //转化为json
                       var twoData=ArrToJson(data);
           do_ajax('POST','/courier/index/expselection',{data:twoData,odd_name:odd_name},'json',function(res){
               if (res.code>0) {
                    layer.close(loading);

                   layer.msg(res.msg, {icon: 1, time: 1000});
                  return ;
               }
               return   layer.msg(res.msg, {icon: 9, time: 1000});


                        })

                        // layer.msg('删除成功', {
                        //     icon: 1
                        // });
                        //找到所有被选中的，发异步进行删除
                        $(".layui-table-body .layui-form-checked").parents('tr').remove();

                    },
                    btn2:function (index,layero) {
                        layer.close(index);
                    }

                });


            } else {
                layer.msg("请先选择需要导出的数据");
            }

        },
        getCheckLength: function() { //获取选中数据
            var checkStatus = table.checkStatus('reload'),
                data = checkStatus.data;


            if(data.length > 0){
                var peple_num = 0;
                var price = 0;
       // console.log(data);
                for(var i=0;i<data.length;i++)
                {

                    peple_num += data[i].countActvi;
                    price= accAdd(data[i].book_money,price)
                }

                //发书人数 发书金额
                layer.alert('<div style="text-align: center">表格:'+data.length+'个<br>人数: '+peple_num+'人<br>金额: '+price+'元 </div>')
            }else{
                layer.msg("请先选择需要查看的数据");
            }


            return false;

        },
        Recommend: function() {
            var checkStatus = table.checkStatus('articleList'),
                data = checkStatus.data;
            if(data.length > 0) {
                layer.msg("您点击了推荐操作");
                for(var i = 0; i < data.length; i++) {
                    console.log("a:" + data[i].recommend);
                    data[i].recommend = "checked";
                    console.log("aa:" + data[i].recommend);
                    form.render();
                }

            } else {
                console.log("b");
                layer.msg("请先选择");
            }

            //$(".layui-table-body .layui-form-checked").parents('tr').children().children('input[name="zzz"]').attr("checked","checked");
        },
        Top: function() {
            layer.msg("您点击了置顶操作");
        },
        Review: function() {
            layer.msg("您点击了审核操作");
        }

    };

    $('.demoTable .layui-btn').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    /*用户-删除*/
    window.member_del = function(obj,id, group) {



        layer.confirm('确认要删除吗？', function(index) {
            //发异步删除数据

            $.ajax({
                type:'post',
                url:'/courier/index/del',
                data:{id:id,group:group},
                success:function(res){
                    if(res.code==1){
                        $(obj).parents("tr").remove();
                        layer.msg(res.msg,{icon: 1,time: 1000});
                        return false;
                    }
                    layer.msg(res.msg,{icon:9});
                },
            });

        });
    }

});
/**
 * 将带有键值对的js数组转换为json数据
 */
function ArrToJson(settime)
{
    if(settime.length == 0){
        return false;
    }

    var newdate = new Array();

    for(var i in settime){
        newdate.push({
            "InviOff":settime[i]['InviOff'],
            "Price":settime[i]['Price'],
            "a_id":settime[i]['a_id'],
            "a_name":settime[i]['a_name'],
            "audi_time":settime[i]['audi_time'],
            "book_money":settime[i]['book_money'],
            "book_prices":settime[i]['book_prices'],
            "book_seller":settime[i]['book_seller'],
            "costPrice":settime[i]['costPrice'],
            "countActvi":settime[i]['countActvi'],
            "create_time":settime[i]['create_time'],
            "firstRate":settime[i]['firstRate'],
            "group":settime[i]['group'],
            "id":settime[i]['id'],
            "inve_num":settime[i]['inve_num'],
            "rd_inve_num":settime[i]['rd_inve_num'],
            "realInve_num":settime[i]['realInve_num'],
            "reject":settime[i]['reject'],
            "takeOff":settime[i]['takeOff'],
            "takeOff_num":settime[i]['takeOff_num'],
        });
    }

    return JSON.stringify(newdate);
}



function accAdd(arg1, arg2) {
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

function delAll(argument) {
    var data = tableCheck.getData();
    layer.confirm('确认要删除吗？' + data, function(index) {
        //捉到所有被选中的，发异步进行删除
        layer.msg('删除成功', {
            icon: 1
        });
        $(".layui-form-checked").not('.header').parents('tr').remove();
    });
}

function art_info(id,group) {


    var url = '/courier/index/reject';
    var loading = layer.load();



    do_ajax('POST', url, {id:id,group:group}, 'json', function(res){

        layer.close(loading);
        layer_form = layer.open({
            type: 1,
            zIndex: 999,
            area: ['50%', ($(window).height()-100 + 'px')],
            fix: false, //不固定
            btn: '',
            title: id ? '修改' : '添加',
            content: res,
            shade:0.3,
            maxmin: true,
            shadeClose: true,
            end: function(){
            }
        });

        // layer.open({
        //     type: 2,
        //     area: [w + 'px', h + 'px'],
        //     fix: false, //不固定
        //     maxmin: true,
        //     shadeClose: true,
        //     shade: 0.4,
        //     title: title,
        //     content: url
        // });
    });
}

function exit_bind(id) {

    var url = '/member/index/exit_bind'+(id ? '?id=' + id : '');
    var loading = layer.load();


    do_ajax('POST', url, '', 'json', function(res){

        if(res.code==1){
            layer.close(loading);
            layer.msg('解绑成功', {
                icon: 1
            });
            // table.reload('Reload');


        }

    });
}