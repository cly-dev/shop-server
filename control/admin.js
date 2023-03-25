/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-11 22:40:36
 * @Description: 处理层
 */
const adminDao =require("../dao/adminDao");
const redisDao=require("../dao/redisDao");
const {TokenVerify,TokenSign }=require("../untils")

const { message,log } = require("../untils");

module.exports={
    //登录
    login:async (req,res)=>{
        try{
            const {adminId,password,code,checkoutCode}=req.body;
            if(adminId && password && code && checkoutCode){
            const redisCode= await redisDao.getCode(checkoutCode)
           
            if(redisCode!==code){
                message("FError",res,'验证码错误');
            }else{
                const adminInfo= await adminDao.getInfo(adminId);
                console.log(adminInfo);
                if(adminId===adminInfo.adminId && password===adminInfo.password){
                    Object.assign(adminInfo,{password:null});
                    if(!TokenVerify(adminInfo.token)){
                        const token=TokenSign({adminId,status:adminInfo.status,power:adminInfo.power});
                        Object.assign(adminInfo,{token});
                        adminDao.update(adminId,{token})
                    }
                    message("Success",res,adminInfo);
                }
            }
            }else{
                message("PError",res);
            }
        }catch(err){
            log.error(err);
            message("Error",res)
        }
    },
    //新增
    create:async (req,res)=>{
        try{
            const {userId}=req.body;
            const {adminId,status,power}=req.headers;
            if(!userId){
                message("PError",res)
            }else{
                if(status==='1' ){
                    if(power==='1'){
                        message("DecideRes",res,await adminDao.create({userId,parentId:adminId}))
                    }else{
                        message("FError",res,'账号已被停用');
                    }
                }else{
                    message("FError",res,'账号已被停用,请联系管理员处理');
                }
            }
        }catch(err){
            console.log(err)
            message("SError",res)
            log.error(err)
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