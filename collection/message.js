/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 21:25:26
 * @Description: 信息Id
 */
module.exports = {
    name: "message",
    collection: {
      //用户Id
      accountId: {
        type: String,
        required: true,
      },
      //管理员Id
      adminId:{
        type:String,
        default:''
      },
      //发送时间
      createTime:{
        type:Number,
        default:Date.now(),
      },
      //类型 1-用户发送 2-客服发送 3-系统信息
      type:{
        type:String,
        enum:['1','2','3'],
        default:'2',
      },
      //0-未读 1-已读
      status:{
        type:String,
        enum:['0','1'],
        default:'0'
      },
      //内容
        content:{
        type:String,
        required: true,
      },
    },
  };
  