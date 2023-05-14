/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-05-12 21:35:00
 * @Description: 
 */
const app=require("./express");
const http=require("http");
const io=require("socket.io");
// const redisClient=require("./redis");
const userDao=require("../dao/userDao");
const messageDao=require("../dao/messageDao");
const adminDao=require("../dao/adminDao");
const serve=http.createServer(app);
const socket = io(serve, { cors: true });
//用户
const user={};
//用户信息
const userInfoMap={};
//管理员
const admin={};
//管理员信息
const adminInfoMap={};
//服务列表
const serverMap={}
socket.on('connection',(client)=>{
    try{
        //用户登录
        client.on('login',async (id)=>{
            user[id]=client.id
            console.log(id);
            userInfoMap[id]=await userDao.detail(id);
            // redisClient.hmset('user',{
            //     [id]:client.id
            // },(err,repiy)=>{
            //     if(err)throw err;
            //     redisClient.hmset('serve',{[id]:''})
            // })
        })
        //用户退出
        client.on('loginOut',(id)=>{
            delete user[id];
            delete userInfoMap[id];
            // redisClient.hdel('user',id,(err,reply)=>{
            //     if(err)throw err;
            //     redisClient.hdel('server',id);
            // })
        })
        //客服登录
        client.on('admin-login',async(id)=>{
            admin[id]=client.id;
            adminInfoMap[id]=await adminDao.detail(id);
            // redisClient.hmset('admin',{
            //     [id]:client.id
            // },(err)=>{
            //     if(err)throw err;
            // })
        })
        //客服退出
        client.on('admin-loginOut',(id)=>{
             delete admin[id]
            delete  adminInfoMap[id];
             Object.keys(serverMap).forEach((item)=>{
                if(serverMap[item]===id){
                    delete serverMap[item]
                }
             })
            // redisClient.hdel('admin',id,(err,reply)=>{
            //     if(accountId){
            //         redisClient.hmset('server',{
            //             [accountId]:''
            //         })
            //     }
            //     if(err)throw err;
            //     console.log(reply);
            // })
        })

        //客服接受用户信息
        client.on('accept',({accountId,adminId})=>{
            serverMap[accountId]=adminId;
            client.to(user[accountId]).emit("system-message",adminInfoMap[adminId])
            // redisClient.hmset('server',{[accountId]:adminId})
        })


        //用户发送消息
        client.on("user-send",({id,content,adminId})=>{
            console.log(id);
            console.log(content);
            console.log(adminId);
            console.log('发送信息')
            //TODO:存储信息
            if(adminId && admin[adminId]){
                client.to(admin[adminId]).emit('user-message',{content,...userInfoMap[id]});
            }else{
                Object.keys(admin).forEach((item)=>{
                    client.to(admin[item]).emit('user-message',{content,id,...userInfoMap[id]});
                })
            }
            // if(adminId){
            //    client.hget('admin',adminId,(err,value)=>{
            //     if(!err){
            //         if(value){
            //             client.to(value).emit("user-message",{content});
            //         }
            //     }
            //    });
            // }else{
            //     client.hvals('admin',adminId,(err,list)=>{
            //         if(!err && list){
            //             list.forEach((item)=>{
            //                 client.to(item).emit('user-message',{content})
            //             })
            //         }
            //     })
            // }
            // if(content){

            // }
        })

        //客服发送信息
        client.on('admin-send',({accountId,adminId,content})=>{
            //获取管理员的信息
            client.to(user[accountId]).emit('admin-message',{...userInfoMap[accountId],content})
        })

        

    }catch(err){
        
    }
})

module.exports=serve;