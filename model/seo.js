/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-13 16:31:14
 * @Description:SEO模型 ;
 */
const {name,collection} =require("../collection/seo");
const dbHandler=require("../server/mongodb");
const mongoose =require("mongoose")
const SeoSchema=new mongoose.Schema(collection);
module.exports=dbHandler.model(name,SeoSchema,name)