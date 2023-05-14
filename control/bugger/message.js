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
        const {accountId}=req.headers
        const {content,adminId}=req.body;
        if(content){
            const data={
                accountId,
                content,
                type:'1'
            }
            if(adminId){
                Object.assign(data,{adminId})
            }
            message('Success',res,await messageDao.create(data))
        }else{
            message("PError",res);
        }
    }catch(err){
            message("SError",res);
    }},
    //@get:chat
    chat:async(req,res)=>{
        try{
            const {accountId}=req.headers;
            message("Success",res,await messageDao.chat(accountId))
        }catch(err){
            console.log(err)
            message("SError",res);
        }
    },
    //@get:list
    list:async(req,res)=>{
        try{
            const {accountId}=req.headers;
            message("Success",res,await messageDao.getListByAccountId(accountId))
        }catch(err){
            console.log(err)
            message("SError",res);
        }
    }
    
}