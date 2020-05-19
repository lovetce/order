<?php
Route::group('admin', function () {
    Route::get('/', 'admin/index/index'); //首页
//    Route::get('/member/lists', 'admin/member/lists'); //首页
});

Route::group('member', function () {
    Route::get('/list_index', 'admin/member/lists_index'); //会员详情页
    Route::get('/lists', 'admin/member/lists'); //会员数据
    Route::get('/add_index', 'admin/member/add_index'); //首页
    Route::post('/edit', 'admin/member/edit'); //首页
    Route::post('/del', 'admin/member/del'); //去获取信息
});

Route::get('/test', 'test/index/index'); //首页

Route::get('/welcome', function () {
    return '我是桌面';
}); //首页
