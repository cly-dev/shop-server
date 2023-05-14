/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-02 23:04:41
 * @Description: 
 */
const Message=require("express").Router();
const messageService =require("../../control/bugger/message");
const {moduleSerive} =require("../../untils/common");
const modules=moduleSerive('bugger','message');
modules.forEach((item)=>{
    Message[item.type](`/${item.path}`,messageService[item.method])
})
module.exports=Message;