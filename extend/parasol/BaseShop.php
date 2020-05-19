<?php


namespace parasol;

abstract class BaseShop
{
    public function buy($gid)
    {
        echo('你购买了ID为 :' . $gid . '的商品');
    }

    public function sell($gid)
    {
        echo('你卖了ID为 :' . $gid . '的商品');
    }

    public function view($gid)
    {
        echo('你查看了ID为 :' . $gid . '的商品');
    }
}