<?php


namespace app\admin\controller;


use parasol\DataEdit;
use think\Db;
use think\db\Where;
use think\Validate;

class Member extends Base implements DataEdit
{
    public function lists_index()
    {
        return $this->fetch();
    }

    public function lists()
    {
        $limit = request()->get('limit');
        $page = request()->get('page');
        $keyword = request()->get('keyword');
        $where = array();


        !empty($keyword) ? $where = [
            ['account', 'like', '%' . $keyword . '%'],
        ] : '';


        $member_data = Db::name('member')->where($where)->where(array(
            'is_del' => 2
        ))->limit(($page - 1) * $limit, $limit)->select();
        $count = Db::name('member')->where(array(
            'is_del' => 2
        ))->count();


        return reJSON(0, $count, $member_data);
    }

    public function add_index()
    {
        $id = request()->get('id');

//        $html = $this->fetch()->getContent();
        return $this->fetch('', array('id' => $id))->getContent();

    }

    public function del()
    {
        $id = request()->post('id');
        if (empty($id)) {
            return json(array(
                'code' => 300,
                'msg' => '数据错误'
            ));
        }
        Db::name('member')->where(array(
            'id' => $id
        ))->update(
            array(
                'is_del' => 1
            )
        );
        return json(array(
            'code' => 200,
            'msg' => '删除成功'
        ));
    }

    public function edit()
    {
        $username = request()->post('username');
        $sex = request()->post('sex');
        $password = request()->post('password');

        $id = request()->post('id');
        if (empty($username) || empty($password)) {
            return json(array(
                'code' => 300,
                'msg' => '数据错误'
            ));
        }


        if (empty($id)) {
            $result = Db::name('member')->insert(array(
                'account' => $username,
                'sex' => $sex,
                'password' => $password,
                'create_time' => date('Y-m-d H:i:s')
            ));
            if ($result) {
                return json(array(
                    'code' => 200,
                    'msg' => '添加成功'
                ));
            }
        } else {
            $result = Db::name('member')->where(array(
                'id' => $id
            ))->update(array(
                'account' => $username,
                'sex' => $sex,
                'password' => $password,
            ));
            if ($result) {
                return json(array(
                    'code' => 200,
                    'msg' => '修改成功'
                ));
            }
        }


    }

    public function getpost()
    {
        return 1;
    }

}