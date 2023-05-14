/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-04-17 01:06:42
 * @Description: 类目
 */
const Category=require('express').Router();
const CategotyService=require("../../control/public/category");
const {moduleSerive} =require("../../untils/common")

const modules=moduleSerive('public','category');
modules.forEach((item)=>{
    Category[item.type](`/${item.path}`,CategotyService[item.method])
})
module.exports=Category;

