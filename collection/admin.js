/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 21:25:26
 * @Description: 
 */
module.exports = {
    name: "admin",
    collection: {
      //管理员Id
      adminId: {
        type: String,
        required: true,
        unique: true,
      },
      //用户名
      userName: {
        type: String,
        default: "",
      },
      //用户密码
      password: {
        type: String,
        default: "123456",
      },
      //用户头像
      avater: {
        type: String,
        default: "/images/user.jpg",
      },
      //手机号码
      phone: {
        type: Number,
        default: '',
      },
      //邮箱
      email: {
        type: String,
        default: "",
      },
      //状态
      status: {
        type: String,
        //1-正常 0-无权限
        enum:['0','1'],
        default: 1,
      },
      //权限
      power:{
        type:String,
        //0-普通用户 1- 超级管理员
        enum:['0','1'],
        default:0
      },
      //用户token
      token: {
        type: String,
        default: "",
      },
      //是否是初始化
      isInit:{
        type:Boolean,
        default:true
      },
      //上级主管
      parentId:{
        type:String,
        default:''
      },
      //注册的时间
      joinTime: {
        type: Number,
        default: Date.now()
      },
    },
  };
  