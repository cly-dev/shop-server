/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 21:25:08
 * @Description: 订单字段
 */
module.exports = {
    name: "order",
    collection: {
      //商品列表
     productItems: {
        type: Array,
        required: true,
      },
      //用户Id
      accountId:{
        type:String,
        required:true
      },
      //个数
      count: {
        type: String,
        default: "暂无名字",
      },
      //用户地址
      address:{
        type:String,
        required:true
      },
      //备注
      mask: {
        type: String,
        default: "",
      },
      //状态
      status:{
        type:String,
        enum:['0','1','2','3']
      },
      //手机号码
      phone: {
        type: Number,
        default: 0,
      },
      //创建时间
      createTime: {
        type: String,
        default: "",
      },
    },
  };
  