/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-12 16:15:26
 * @Description: 
 */
const redis =require("../server/redis");
const {getErr}=require("../untils/catch");

module.exports={
    //记录发送验证码的唯一标识
    setCode:(key,code)=>{
       return redis.setex(key, 10 * 1000 * 60, code)
    },
    //获取验证码
    getCode:(key)=>{
       return new Promise(((resolve,reject)=>{
        redis.get(key,(err,doc)=>{
            if(err){
                reject(getErr("500",err))
            }
            resolve(doc)
           });
       })) 
    },
    //记录邮箱验证码
    setEmailCode:(key,code)=>{
        return redis.setex(key, 10 * 1000 * 60,code);
    },
    //获取邮箱验证码
    getEmailCode:(key)=>{
        return new Promise(((resolve,reject)=>{
            redis.get(key,(err,doc)=>{
                if(err){
                    reject(getErr("500",err))
                }
                resolve(doc)
               });
           })) 
    }



}