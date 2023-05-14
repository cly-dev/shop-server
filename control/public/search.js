/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-05-06 22:47:04
 * @Description: 
 */
const searchDao=require("../../dao/searchDao");
const { message } = require("../../untils");
//@get:filter
module.exports={
   filter:async(req,res)=>{
        try{
            const {size,page}=req.query;
            if(size && page){
                message("Success",res,await searchDao.search(page,size,req.query))
            }else{
                message("PError",res);
            }
        }catch(err){
            console.log(err);
            message("SError",res);
        }
    }
}
