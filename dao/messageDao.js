/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-05-13 00:50:38
 * @Description: 
 */
const  messageModel=require("../model/message");


module.exports={
    //创建一个新的消息
    create:(data)=>{
        const msg=new messageModel({...data,createTime:Date.now()});
        return msg.save();
    },
    //查看用户的记录
    chat:(accountId)=>{
        return messageModel.aggregate([{
            $match:{
                accountId
            }  
        },{
            $group:{
                _id:'$adminId',
                list:{$push:'$$ROOT'}
            },
        },{
                $lookup: {
                from: 'admin',
                localField: 'adminId',
                foreignField: 'adminId',
                as: 'adminInfo'
                }
        },{
            $unwind:'$adminInfo'
        }])
    },
    //批量更新信息的状态--修改客服
    update:(_id,adminId)=>{
        // messageModel.updateMany({})
        messageModel.updateMany({adminId:'',type:'1'},{$set:{adminId}})
    },
    //获取消息列表
    list:(adminId)=>{
       return messageModel.aggregate([{
            $match:{
                adminId
            }
        },{
            $group:{
                _id:'$accountId',
                list:{$push:'$$ROOT'}
            },
        },{
            $lookup:{
                from:'user',
                localField:'_id',
                foreignField:'accountId',
                as:'userData'
            }
        },{
            $unwind:'$userData'
        },{
            $project:{
                'userData.password':0,
                'userData.token':0,
            }
        }])
    },
    //获取某个消息
    getListByAccountId:(accountId)=>{
        console.log(accountId);
        return messageModel.aggregate([{
            $match:{
                accountId,
            }
        },{
           $lookup:{
                from:'admin',
                localField:'adminId',
                foreignField:'adminId',
                as:'amdinInfo'
           } 
        },{
            $unwind:'$amdinInfo'
        },{
            $project:{
                'amdinInfo.password':0,
                'amdinInfo.token':0,
            }
        }])
    }
}