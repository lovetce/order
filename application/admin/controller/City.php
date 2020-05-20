<?php


namespace app\admin\controller;


use parasol\DataEdit;
use think\Controller;
use think\Db;

class City extends Base implements DataEdit
{


    /**
     * @return mixed
     * 首页模板
     */
    public function lists_index()
    {
        $city = Db::name('config')->where(array('id' => 1))->value('city');


        return $this->fetch('',array('city'=>$city));
    }

    /**
     * @return mixed
     */
    public function lists()
    {
        $city = Db::name('config')->where(array('id' => 1))->value('city');
        return json(array(
            'code' => 200,
            'data' => $city
        ));

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
        $cityData = request()->post('data');
        if (empty($cityData)) {
            return json(array(
                'code' => 300,
                'msg' => '数据错误'
            ));
        }
        $result = Db::name('config')->where('id', 1)->update(array(
            'city' => $cityData
        ));
        if ($result) {
            return json(array(
                'code' => 200,
                'msg' => '修改成功'
            ));
        }
        return json(array(
            'code' => 300,
            'msg' => '修改失败'
        ));


    }
}