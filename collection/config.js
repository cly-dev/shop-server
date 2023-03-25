/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 21:25:08
 * @Description: 内容配置字段
 */
module.exports = {
    name: "config",
    collection: {
      //位置
      location:{
        type:String,
        enum:['notice','banner','category','hotCategory','product','activity'],
        required:true,
      },
      //后台名
     configTitle: {
        type: String,
        default: "",
      },
      //内容
      content: {
        type: String,
        default: "",
      },
      //链接
      url:{
        type:String,
        default:''
      },
      //图片
      imageUrl: {
        type: String,
        default: "",
      },
      //类型 1-商品 2-类目
      type:{
          type:String,
          enum:['1','2'],
          default:'1'
      }, 
      //配置的Id,类目、商品
      itemId:{
        type:Array,
        default:[]
      },
      //状态 0-启用 1-禁用
      status: {
        type: String,
        enum:['0','1'],
        default: '1',
      },
    //排序
    sortValue:{
        type:Number,
        default:0
    },//创建时间
     createTime:{
      type:Number,
      default:Date.now()
    }
    },
  };
  