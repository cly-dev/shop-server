/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 21:25:08
 * @Description: 用户字段
 */
module.exports = {
    name: "user",
    collection: {
      //用户id
      accountId: {
        type: String,
        required: true,
        unique: true,
      },
      //用户名
      userName: {
        type: String,
        default: "暂无名字",
      },
      //用户密码
      password: {
        type: String,
        default: "",
      },
      //用户签名
      sign: {
        type: String,
        default: "",
      },
      //用户头像
      avater: {
        type: String,
        default: "/images/user.jpg",
      },
      //手机号码
      phone: {
        type: String,
        default: '',
      },
      //状态
      status: {
        type: Number,
        default: 0,
      },
      //性别 0-女 1-男
      sex:{
        type:String,
        enum:[''|'0' | '1'],
        default:''
      },
      //用户token
      token: {
        type: String,
        default: "",
      },
      //注册的时间
      joinTime: {
        type: String,
        default: "",
      },
    },
  };
  