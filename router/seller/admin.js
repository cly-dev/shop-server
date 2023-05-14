/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-11 22:14:57
 * @Description: 接口层
 */
const Admin=require("express").Router();
const adminSerive=require("../../control/admin");
Admin.post('/create',adminSerive.create)
Admin.get('/list',adminSerive.list)


module.exports=Admin