/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-05-13 00:59:00
 * @Description: 
 */
const message = require("../../untils/message");
const messageDao=require("../../dao/messageDao");

module.exports={
    //@post:create
    create:async(req,res)=>{
        try{
        const {adminId}=req.headers
        const {content,accountId}=req.body;
        if(content && accountId){
            const data={
                accountId,
                content,
                type:'2',
                adminId
            }
            message('Success',res,await messageDao.create(data))
        }else{
            message("PError",res);
        }
    }catch(err){
            message("SError",res);
    }},
    //@get:chat
    chat:async (req,res)=>{
        try{
            const {adminId}=req.headers;
            message("Success",res,await messageDao.list(adminId))
        }catch(err){
            message("SError",res);
        }
    }
    
}