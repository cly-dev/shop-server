/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-12 16:01:32
 * @Description:捕获错误,并抛出提示
 */
const logger =require("./log");
const ErrorMap=require('../constant/tips')

module.exports=(code,err)=>{
    if(code==='500' && err){
        logger.error(err);
    }
    return Promise.reject({code,msg:err?err:ErrorMap[code]})
}
