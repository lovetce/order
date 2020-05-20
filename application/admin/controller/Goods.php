<?php


namespace app\admin\controller;


use parasol\DataEdit;

class Goods extends Base implements DataEdit
{

    /**
     * @return mixed
     */
    public function lists_index()
    {
        return $this->fetch();
    }

    /**
     * @return mixed
     */
    public function lists()
    {
        // TODO: Implement lists() method.
    }

    /**
     * @return mixed
     */
    public function add_index()
    {
        // TODO: Implement add_index() method.
    }

    /**
     * @return mixed
     */
    public function del()
    {
        // TODO: Implement del() method.
    }

    /**
     * @return mixed
     */
    public function edit()
    {
        // TODO: Implement edit() method.
    }
}