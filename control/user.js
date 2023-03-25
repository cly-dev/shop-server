/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-11 22:40:36
 * @Description: 处理层
 */
const userDao =require("../dao/userDao")
const {TokenVerify,TokenSign }=require("../untils")
const {sendRes}=require("../untils/common")
const catchErr=require("../untils/catch");

const { message,log } = require("../untils");
const redisDao = require("../dao/redisDao");

module.exports={
    //登录
    login:async (req,res)=>{
        try{
            const {accountId,password}=req.body;
            if(accountId && password ){
                const userInfo= await userDao.getInfo(accountId);
                if(accountId===userInfo.accountId && password===userInfo.password){
                    Object.assign(userInfo,{password:null});
                    
                    if(!TokenVerify(userInfo.token)){
                        const token=TokenSign({accountId:userInfo.accountId,userName:userInfo.userName,status:userInfo.status});
                        Object.assign(userInfo,{token});
                         userDao.update(accountId,{token})
                    }
                    message("Success",res,userInfo);
                }else{
                    message('FError',res,'账号或密码错误')
                }
            }else{
                message('PError',res)
            }
        }catch(err){
            console.log(err);
            message("SError",res)
        }
    },
    //注册
    register:async (req,res)=>{
        try{
          const {email,password,code,checkoutCode}=req.body;
          if(email && password && code && checkoutCode){
            const redisCode=await redisDao.getEmailCode(checkoutCode);
            if(code!==redisCode){
                 message("FError",res,'验证码错误');
            }else{
                userDao.create({accountId:email,password}).then(()=>{
                message("Success",res)
                }).catch((err)=>{
                    message("SError",res);

                })
            }
          }else{
            message("PError",res);
          }
        }catch(err){
            message("SError",res);
        }
    },
    //查询
    list:async (req,res)=>{
        try{
            const {size,page}=req.query;
            if(size && page){
                message("Success",res,await  adminDao.list({...req.query}))
            }else{
                message("PError",res)
            }
        }catch(err){
            message("SError",res);
            log.error(err)
        }
    }
}