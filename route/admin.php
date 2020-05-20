<?php
Route::group('admin', function () {
    Route::get('/', 'admin/index/index'); //首页
});

Route::group('member', function () {
    Route::get('/list_index', 'admin/member/lists_index'); //会员详情页
    Route::get('/lists', 'admin/member/lists'); //会员数据
    Route::get('/add_index', 'admin/member/add_index'); //首页
    Route::post('/edit', 'admin/member/edit'); //首页
    Route::post('/del', 'admin/member/del'); //去获取信息
});

Route::group('city', function () {
    Route::get('/list_index', 'admin/city/lists_index'); //
    Route::post('/lists', 'admin/city/lists'); //
    Route::post('/edit', 'admin/city/edit'); //首页
});

//商品类别管理
Route::group('goods_type', function () {
    Route::get('/list_index', 'admin/goods_type/lists_index');
    Route::get('/lists', 'admin/goods_type/lists');
    Route::post('/edit', 'admin/goods_type/edit');
    Route::get('/add_index', 'admin/goods_type/add_index');
});


Route::get('/test', 'test/index/index'); //测试

Route::get('/welcome', function () {
    return '我是桌面';
});
