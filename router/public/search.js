/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-02 23:04:41
 * @Description: 
 */
const Search=require("express").Router();
const searchService =require("../../control/public/search");
const {moduleSerive} =require("../../untils/common");
const modules=moduleSerive('public','search');
modules.forEach((item)=>{
    Search[item.type](`/${item.path}`,searchService[item.method])
})
module.exports=Search;