/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-02 23:04:41
 * @Description: 
 */
const Config=require("express").Router();
const configService=require("../../control/config");
const {moduleSerive} =require("../../untils/common");
const modules=moduleSerive('bugger','config');
modules.forEach((item)=>{
    Config[item.type](`/${item.path}`,configService[item.method])
})
module.exports=Config;