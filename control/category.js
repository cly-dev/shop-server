/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-05 21:35:01
 * @Description: 
 */
const categoryDao=require('../dao/category');
const {message} =require("../untils");
module.exports={
    //新建
    create:async (req,res)=>{
        try{
        const {adminId}=req.headers;
        const {itemList,categoryTitle,iconUrl,desc,imageUrl,level,parentId,seoUrl,seoTitle,seoDesc}=req.body;
        if(categoryTitle && imageUrl&& seoUrl && seoTitle ){
            message("Success",res,await categoryDao.create({itemList,iconUrl,level,parentId:parentId || '0',categoryTitle,imageUrl,desc,operator:adminId,seoUrl,seoDesc,seoTitle}));
        }else{
            message("PError",res)
        }
    }catch(err){
        console.log(err);
        message("SError",res)
    }
    },
    //获取列表
    list:async (req,res)=>{
        try{
        const {id,size,page,categoryTitle,status}=req.query;
        if(size && page){
            let result=null;
            if(id){
                result={
                    list:await categoryDao.detail(id),
                    total:1
                };
            }else{
                result=await categoryDao.list(page,size,{categoryTitle,status});
            }   
            message("Success",res,result);
        }else{
            message("PError",res)
        }
    }catch(err){
        console.log(err)
        message("SError",res)
    }
    },
    //获取详情
    detail:async (req,res)=>{
        try{
            const {id}=req.query;
            if(id){
                message("Success",res,await categoryDao.detail(id));
            }else{
                message("PError",res)
            }
        }catch(err){
            message("SError",res)
        }
    },
    //删除
    delete:async (req,res)=>{
        const {id}=req.query;
        try{
            if(id){
                await categoryDao.delete(id)
                message("Success",res);
            }else{
                message("PError",res);
            }
        }catch(err){
            message("SError",res);
        }
    },
    //修改
    update:async (req,res)=>{
        const {id}=req.params;
        const { categoryTitle,desc,iconUrl,imageUrl,itemList,seoTitle,seoDesc,seoUrl}=req.body;
        try{
            if(id){
                await categoryDao.update(id,{iconUrl,categoryTitle,itemList,total,imageUrl,desc,mediaList,videoSrc,discountPrice,originPrice,custom, videoDesc});
                message("Success",res)
            }else{
                message("PError",res);
            }
        }catch(err){
            message("SError",res)
        }
    },
    //通过seoUrl获取详情
    getInfoBySeoUrl:async (req,res)=>{
        const {seoUrl}=req.query;
        try{
            if(seoUrl){
                message("Success",res,await categoryDao.getInfoBySeoUrl(seoUrl));
            }else{
                message("PError",res);
            }
        }catch(err){
            message("SError",res);
        }
    },
    //修改状态
    status:async (req,res)=>{
        try{
        const {id}=req.params;
        const {status}=req.body;
        if(id && status){
            await categoryDao.status(id,status);
            message("Success",res)
        }else{
            message("Prror",res)

        }
    }catch(err){
        message("Error",res)
    }
    }
}