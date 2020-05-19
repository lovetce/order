<?php

namespace app\test\controller;


use parasol\Task;
use parasol\BallShop;

class Index
{

    public function index()
    {
//        $task = new Task();
//        $task->test();
//        unset($task);


        $BallShop = new BallShop();
        $BallShop->open();
    }

}