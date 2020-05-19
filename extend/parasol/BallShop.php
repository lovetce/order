<?php


namespace parasol;


class BallShop extends BaseShop
{
    var $item_id = null;

    public function __construct()
    {
        $this->item_id = 2314;
    }

    public function open()
    {
        $this->sell($this->item_id);
    }
}