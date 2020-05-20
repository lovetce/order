layui.extend({
    admin: '{/}../../static/js/admin'
});

layui.use(['table', 'jquery','form', 'admin'], function() {
    var table = layui.table,
        $ = layui.jquery,
        form = layui.form,
        admin = layui.admin;

    table.render({
        elem: '#booksList',
        cellMinWidth: 80,
        url: '/admin/bookseller/info',
        cols: [
            [{
                field: 'id',title: 'ID',sort: true
            }, {
                field: 'bookseller_name',title: '书商名称'
            }, {
                field: 'ord',title: '排序',sort: true
            }, {
                field: 'operate',title: '操作',toolbar: '#operateTpl',unresize: true
            }]
        ],
        id: 'Reload',
        event: true,
        page: true
    });
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


        getCheckData: function() { //获取选中数据
            var checkStatus = table.checkStatus('articleList'),
                data = checkStatus.data;
            //console.log(data);
            //layer.alert(JSON.stringify(data));
            if(data.length > 0) {
                layer.confirm('确认要删除吗？' + JSON.stringify(data), function(index) {
                    layer.msg('删除成功', {
                        icon: 1
                    });
                    //找到所有被选中的，发异步进行删除
                    $(".layui-table-body .layui-form-checked").parents('tr').remove();
                });
            } else {
                layer.msg("请先选择需要删除的文章！");
            }

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
    window.member_del = function(obj, id) {
        layer.confirm('确认要删除吗？', function(index) {
            //发异步删除数据

            $.ajax({
                type:'post',
                url:'/admin/bookseller/del',
                data:{id:id},
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

function art_info(id) {

    var url = '/admin/bookseller/edit_show'+(id ? '?id=' + id : '');
    var loading = layer.load();



    do_ajax('POST', url, '', 'json', function(res){

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