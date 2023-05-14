/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-05-06 22:47:04
 * @Description: 
 */
const configDao=require("../../dao/configDao");
const { message } = require("../../untils");

//获取各个类型的集合
//@get:collection
module.exports={
    collection:async(req,res)=>{
        try{
            message("Success",rea,await configDao.collection());
        }catch(err){
            message("SError",res);
        }
    }
}
