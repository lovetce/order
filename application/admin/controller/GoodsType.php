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
        $keyword = request()->get('keyword');
        $keyword = trim($keyword);
        $where = array();


        !empty($keyword) ? $where = [
            ['type_name', 'like', '%' . $keyword . '%'],
        ] : '';

        $member_data = Db::name('goods_type')->where($where)->where(array(
            'is_del' => 2
        ))->limit(($page - 1) * $limit, $limit)->select();


//        var_dump(Db::table('goods_type')->getLastSql());
//        die;


        $count = Db::name('goods_type')->where($where)->where(array(
            'is_del' => 2
        ))->count();


        return reJSON(0, $count, $member_data);
    }

    /**
     * @return mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function add_index()
    {
        $id = request()->get('id');
        $data = array();
        if (!empty($id)) {
            $data = Db::name('goods_type')->where(array('id' => $id))->find();
        }
        return $this->fetch('', array('data' => $data))->getContent();
    }

    /**
     * @return \think\response\Json
     * @throws \think\Exception
     * @throws \think\exception\PDOException
     */
    public function del()
    {
        $id = request()->post('id');

        if (empty($id)) {
            return json(array(
                'code' => 300,
                'msg' => '数据错误'
            ));
        }
        $result = Db::name('goods_type')->where(array(
            'id' => $id
        ))->update(array(
            'is_del' => 1
        ));
        if ($result) {
            return json(array(
                'code' => 200,
                'msg' => '删除成功'
            ));
        }
        return json(array(
            'code' => 300,
            'msg' => '删除失败'
        ));


    }

    /**
     * @return \think\response\Json
     * @throws \think\Exception
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     * @throws \think\exception\PDOException
     */
    public function edit()
    {
        $type_name = request()->post('type_name');
        $id = request()->post('id');

        if (empty($id)) { //表示添加
            //去查询该类别是否存在
            $goods_type_data = Db::name('goods_type')->where(array('type_name' => $type_name))->find();
            if (!empty($goods_type_data)) {
                return json(array(
                    'code' => 300,
                    'msg' => '该类别已经存在'
                ));
            }

            $result = Db::name('goods_type')->insert(array(
                'type_name' => $type_name,
                'create_time' => date('Y-m-d H:i:s')
            ));
            if (!empty($result)) { //表示添加
                return json(array(
                    'code' => 200,
                    'msg' => '添加成功'
                ));
            }
            return json(array(
                'code' => 300,
                'msg' => '添加失败'
            ));
        } else {
            $result = Db::name('goods_type')->where(array(
                'id' => $id
            ))->update(array(
                'type_name' => $type_name
            ));
            if (!empty($result)) { //表示添加
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
}