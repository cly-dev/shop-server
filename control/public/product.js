/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-05-06 22:47:04
 * @Description: 
 */
const productDao=require("../../dao/productDao");
const { message } = require("../../untils");
//获取各个类型的集合
//@get:detail/:seoUrl
module.exports={
    detail:async(req,res)=>{
        try{
            const {seoUrl}=req.params;
            if(seoUrl){
                message("Success",res,await productDao.getInfoBySeoUrl(seoUrl))
            }else{
                message("PError",res);
            }
        }catch(err){
            console.log(err);
            message("SError",res);
        }
    }
}
