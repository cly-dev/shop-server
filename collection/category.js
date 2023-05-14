/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 21:25:08
 * @Description: 类目字段
 */
const { ObjectId } = require("mongodb");
const mongoose=require("mongoose");
const parentId=new ObjectId(0)
module.exports = {
    name: "category",
    collection: {
      //seoId
      seoUrl:{
        type:String,
        required:true,
        unique:true,
      },
      seoTitle:{
        type:String,
        default:''
      },
      seoDesc:{
        type:String,
        default:'',
      },
      //类目名
     categoryTitle: {
        type: String,
        default: "",
      },
      //类目描述
      desc: {
        type: String,
        default: "",
      },
      //类目图标
      iconUrl:{
        type:String,
        default:''
      },
      //类目主图
      imageUrl: {
        type: String,
        default: "",
      },
      //商品列表
      itemList:{
        type:Array,
        default:[]
      },
      //状态 0-启用 1-禁用
      status: {
        type: String,
        enum:['0','1'],
        default: '0',
      },
      //级别：1、2、3级
      level:{
        type:String,
        enum:['1','2','3'],
        default:'1'
      },
      //父级Id，0-一级
     parentId:{
        type: mongoose.Schema.Types.ObjectId,
        default:parentId
     },
     //创建时间
    creatTime:{
      type:Number,
      default:Date.now()
    },
    sortValue:{
      type:Number,
      default:Date.now()
    },
    //创建人
      operator:{
        type:String,
        default:''
      }
    },
  };
  