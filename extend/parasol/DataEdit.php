<?php


namespace parasol;


interface  DataEdit
{
    //主页面
    public function lists_index();

    //数据接口
    public function lists();

    //添加页面
    public function add_index();

    //删除数据
    public function del();

    //修改数据
    public function edit();

}