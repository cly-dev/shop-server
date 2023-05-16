/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-04-17 01:06:42
 * @Description: 类目
 */
const User=require('express').Router();
const UserService=require("../../control/bugger/user");
const {moduleSerive} =require("../../untils/common")

const modules=moduleSerive('bugger','user');
modules.forEach((item)=>{
   User[item.type](`/${item.path}`, UserService[item.method])
})
module.exports=User;

