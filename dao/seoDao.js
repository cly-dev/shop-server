/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-05 21:18:03
 * @Description: seo
 */
const SeoModel=require("../model/seo");
module.exports={
    //创建
    create:(data)=>{
        const seo=new SeoModel(data);
        return seo.save();
    },
    //更新
    update:(_id,data)=>{
        SeoModel.updateOne({_id},{$set:data})
    }
}   