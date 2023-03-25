/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-22 21:43:46
 * @Description:内容配置
 */
const configDao=require('../dao/configDao');
const {message}=require("../untils")
const locationType= ['notice','banner','category','hotCategory','product','activity'];
module.exports={
    //新增
    create:async(req,res)=>{
        try{
            const {location,configTitle}=req.body;
            if(location && locationType.includes(location) && configTitle ){
                message("Success",res,await configDao.create({location,configTitle}))
            }else{
                message("PError",res)
            }
        }catch(err){

        }
    },
    //状态
    status:async(req,res)=>{
        try{
            const {status}=req.body;
            const {id}=req.params;
            if(id && status){
                await configDao.status(id,status)
                message("Success",res)
            }else{
                message("PError",res)

            }
        }catch(err){
            console.log(err);
            message("SError",res)
        }
    },
    //修改
    update:async(req,res)=>{
        try{
            const {location,configTitle,content,url,imageUrl,type,sortValue}=req.body;
            const {id}=req.params;
            if(id){
                await configDao.update(id,{location,configTitle,content,imageUrl,type,url,sortValue});
                message("Success",res)
            }else{
                message("PError",res);
            }
        }catch(err){
            console.log(err)
            message("SError",res);

        }
    },
    //删除
    delete:async(req,res)=>{
        try{
            const {id}=req.query;
            if(id){
                await configDao.delete(id)
                message("Success",res)
            }else{
                message("PError",res)
            }
        }catch(err){
            message("SError",res)

        }
    },
    //获取列表
    list:async(req,res)=>{
        const {size,page,location,configTitle,status}=req.query;
        if(size && page){
            message("Success",res,await configDao.list(page,size,{location,status,configTitle}));
        }else{
            message("PError",res);
        }
    },
    //获取各个类型的数据
    collection: async(req,res)=>{
        try{
            message("Success",res,await configDao.collection())
        }catch(err){
            console.log(err);
            message("SError",res);
        }
    }
}