/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 21:25:26
 * @Description: seo字段
 */
module.exports = {
    name: "seo",
    collection: {
      //seo链接
      seoUrl: {
        type: String,
        required: true,
        unique:true
      },
      //seo描述
      seoDesc:{
        type:String,
        default:''
      },
      //seo标题
      seoTitle:{
        type:String,
        required: true,
      },
    },
  };
  