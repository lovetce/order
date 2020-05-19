<?php


namespace app\admin\controller;


use think\Controller;

class Index extends Base
{
    public function index()
    {

//        return 12312;
        return $this->fetch();
    }

}