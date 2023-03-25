/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 21:54:22
 * @Description: 管理员接口
 */
const adminModel=require("../model/admin");
const { isEmpty } = require("../untils");
const {getErr}=require("../untils/common");

module.exports={
    //添加用户
    create:(data)=>new Promise((resolve,reject)=>{
            const admin=new adminModel(data);
            admin.save().then((res)=>{
                    resolve()
            }).catch((err)=>{
                reject(err)
            })
    }),
    //查询用户的信息
    getInfo:(adminId,params)=>{
        return new Promise((resolve,reject)=>{
            adminModel.findOne({adminId},{...params}).then((doc)=>{
                if(isEmpty(doc)){
                    resolve(doc)
                }else{
                    reject(getErr('501'))
                }
            }).catch((err)=>{
                reject(getErr('500',err));
            })
        })
       
    },
    //修改用户信息
    update:(adminId,data)=>new Promise((resolve,reject)=>{
        adminModel.updateOne({adminId},{$set:data}).then(({nModified})=>{
            if(nModified){
                resolve('200')
            }
        }).catch((err)=>{
            reject(err)
        })
    }),
    //查询用户
    list:(params,size,page)=>{
        return adminModel.find(params,{password:0,token:0}).skip(((page - 1) * size)).limit(size)
    },  
    //查询的条数
    count:(params)=>{
        return adminModel.find(params).count();
    }
    
}