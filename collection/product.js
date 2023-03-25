/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 21:25:08
 * @Description: 商品字段
 */
module.exports = {
    name: "product",
    collection: {
      //类目Id
      categoryId:{
        type:String,
        required:true,
      },
      //seo
      seoUrl:{
        type:String,
        required:true,
      },
      //商品名
      productTitle: {
        type: String,
        default: "",
      },
      //商品库存
      total: {
        type:Number,
        default: 99,
      },
      //商品描述
      desc: {
        type: String,
        default: "",
      },
      //商品主图
      imageUrl: {
        type: String,
        default: "",
      },
      //商品图片列表
      mediaList:{
        type:Array,
        default:[]
      },
      //商品视频
      videoSrc:{
        type:String,
        default:''
      },
      //商品视频说明
      videoDesc:{
        type:String,
        default:''
      },
      //售价
      discountPrice: {
        type: Number,
        default: 0,
      },
      //原价
      originPrice:{
        type:Number,
        default:0
      },
      //状态 0-下架 1-上架
      status: {
        type: String,
        enum:['0','1'],
        default: '0',
      },
      //细节描述 key-value
      custom:{
        type:String,
        default:[]
      },
      //创建时间
      createTime:{
        type:Number,
        default:Date.now()
      },
      //创建人
      operator:{
        type:String,
        default:''
      },
      //品牌
      brand:{
        type:String,
        default:''
      },
      //颜色
      color:{
        type:String,
        default:''
      },
      //涂抹位置
      location:{
        type:String,
        default:'',
      },
      //送运费验
      freightInspection:{
        type:Boolean,
        default:false,
      },
      //15天价保
      priceEnsure:{
        type:Boolean,
        default:false
      },
      //过敏包退
      allergyTurn:{
        type:Boolean,
        default:false
      },
      //七天无理由
       notReason:{
        type:Boolean,
        default:false
       },
       //免运费
       freightFree:{
        type:Boolean,
        default:false
       },
       //运费
       freight:{
        type:Number,
        default:0
       }
    },
  };
  