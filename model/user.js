/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-13 16:31:14
 * @Description:用户模型 ;
 */
const {name,collection} =require("../collection/user");
const dbHandler=require("../server/mongodb");
const mongoose =require("mongoose")
const UserSchema=mongoose.Schema(collection);
module.exports=dbHandler.model(name,UserSchema,name)