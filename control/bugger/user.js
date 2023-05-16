/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-05-16 21:27:46
 * @Description: 
 */
const userDao=require("../../dao/userDao");
const message = require("../../untils/message");

module.exports={
    //查询
    //@get:detail
    detail:async(req,res)=>{
        try{
            const {accountId}=req.headers;
            console.log(accountId);
            console.log('用户ID')
            message("Success",res,await userDao.detail(accountId));
        }catch(err){
            message("SError",res);
        }     
    },
    //修改信息
    //@put:update
    update:async (req,res)=>{
        try{
            const {accountId}=req.headers;
            const {userName,sign,avater,sex,password}=req.body;
            message("Success",res,await userDao.update(accountId,{userName,sign,avater,sex,password}))
        }catch(err){
            console.log(err);
            message("SError",res);
        }
    },
    //修改密码
    //@put:updatePassword
    updatePassword:async(req,res)=>{
        try{
        const {accountId}=req.headers;
        const {oldPassword,password}=req.body;
        if(oldPassword && password){
            const userData=await userDao.detail(accountId);
            if(userData){
                if(userData.password!==oldPassword){
                    message("Success",res,await userDao.update(accountId,{password}))
                }else{
                    message("FError",res,'原密码错误');
                }
            }else{
                throw Error('err');
            }
        }else{
            message("PError",res);
        }
        }catch(err){
            message("SError",res,err);
        }
    }
}