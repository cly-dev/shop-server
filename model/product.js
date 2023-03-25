/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-13 16:31:14
 * @Description:商品模型
 */
const {name,collection} =require("../collection/product");
const dbHandler=require("../server/mongodb");
const mongoose =require("mongoose");
const ProductSchema=new mongoose.Schema(collection);
// //存储的时候自动保存seo信息
// ProductSchema.pre('save',async function(next){
//     const {seoTitle,seoDesc,seoUrl}=this;
//     console.log(this);
//     console.log(next)
//     console.log('-=--------------')
//     if(seoUrl && seoTitle){
//       console.log(seoUrl);
//       console.log(seoTitle);

//       const info= await SeoDao.create({seoTitle,seoDesc,seoUrl});
//       this.seoId=info._id;
//     }
//     next();
// })
// //更新的时候查看时候更新seo信息
// ProductSchema.pre("updateOne",async function (next){
//     const {seoTitle,seoDesc,seoUrl,_id}=this;
//     if(seoTitle,seoDesc,seoUrl){
//         const info=this.findById(_id);
//         await SeoDao.update(info.seoId,{seoTitle,seoDesc,seoUrl})
//     }   
//     next()
// })
module.exports=dbHandler.model(name,ProductSchema,name)