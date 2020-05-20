layui.extend({
    admin: '{/}../../static/js/admin'
});

layui.use(['table', 'jquery','form', 'admin'], function() {
    var table = layui.table,
        $ = layui.jquery,
        form = layui.form,
        admin = layui.admin;

    table.render({
        elem: '#excelList',
        url: '/courier/index/excelDown',
        totalRow: true,
        cols: [
            [
                {field: 'id',title: 'ID',sort: true,fixed: 'left',unresize: true,totalRowText: '合计'},
                {field:'create_time',title:'创建时间'},
                {field: 'odd_name',title: '名称'},
                {field: 'status',title: '状态'},
                {field: 'countActvi',title: '发书人数',sort: true, totalRow: true},
                {field: 'book_money',title: '发书金额',sort: true, totalRow: true},
                {field: 'operate',title: '操作',toolbar: '#operateTpl',unresize: true}
            ]
        ],
        // page:true,
        id: 'reload',
    });
    //监听表格复选框选择
    table.on('checkbox(test)', function(obj){
        console.log(obj)

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





    };

    $('.demoTable .layui-btn').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });



});
function art_load(id) {
    var url='/courier/index/art_load?id='+id
   window.open(url);
}



function art_see(id) {
    var url = '/courier/index/art_see';
    var loading = layer.load();
    do_ajax('POST', url, {id:id}, 'json', function(res){

        layer.close(loading);
        layer_form = layer.open({
            type: 1,
            zIndex: 999,
            area: ['95%', '95%'],
            fix: false, //不固定
            btn: '',
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