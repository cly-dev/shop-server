/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-02 23:04:41
 * @Description: 
 */
const Config=require("express").Router();
const configService=require("../../control/config");
Config.get('/collection',configService.collection);
module.exports=Config;