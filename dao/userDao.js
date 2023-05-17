/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-13 16:40:50
 * @Description: 
 */
const UserModel =require("../model/user");
const {getErr, getParams}=require("../untils/common");

module.exports={
    //新增
    create:(data)=>{
        return new Promise((resolve,reject)=>{
            const user=new UserModel({...data,joinTime:Date.now()});
            user.save().then(()=>{
                resolve()
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //查询某个用户
    getInfo:(email,option)=>{
       return UserModel.findOne({accountId:email},option)
    },
    //更新用户信息
    update:(accountId,params)=>{
        const data=getParams(params)
        return UserModel.updateOne({accountId},{$set:data})
    },
    //查询用户的详细信息
    detail:(accountId)=>{
        return UserModel.findOne({accountId},{password:0})
    }



}