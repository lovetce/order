<?php


namespace app\admin\controller;


use parasol\DataEdit;
use think\Db;

class GoodsType extends Base implements DataEdit
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
        $limit = request()->get('limit');
        $page = request()->get('page');
        $type_name = request()->get('type_name');
        $where = array();


        !empty($type_name) ? $where['type_name'] = ['like', '%' . $type_name . '%'] : '';


        $member_data = Db::name('goods_type')->where($where)->where(array(
            'is_del' => 2
        ))->limit(($page - 1) * $limit, $limit)->select();
        $count = Db::name('goods_type')->where(array(
            'is_del' => 2
        ))->count();


        return reJSON(0, $count, $member_data);
    }

    /**
     * @return mixed
     */
    public function add_index()
    {
        return $this->fetch()->getContent();
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