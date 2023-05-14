/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-02 23:04:41
 * @Description: 
 */
const Message=require("express").Router();
const messageService =require("../../control/seller/message");
const {moduleSerive} =require("../../untils/common");
const modules=moduleSerive('seller','message');
modules.forEach((item)=>{
    Message[item.type](`/${item.path}`,messageService[item.method])
})
module.exports=Message;