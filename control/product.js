/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-05 21:35:01
 * @Description: 
 */
const productDao=require('../dao/productDao');
const {message} =require("../untils");
module.exports={
    //新建
    create:async (req,res)=>{
        try{
        const {adminId}=req.headers;
        const {categoryId,productTitle,total,desc,imageUrl,mediaList,videoSrc,discountPrice,originPrice,custom,seoUrl,seoTitle,seoDesc,videoDesc,brand,color,freightInspection,priceEnsure,allergyTurn,notReason,freight, freightFree,location,address,skudId}=req.body;
        console.log(typeof custom);
        console.log("我是自定义")
        if(categoryId && productTitle && total && imageUrl && discountPrice && seoUrl && seoTitle && skudId ){
            message("Success",res,await productDao.create({categoryId,productTitle,total,imageUrl,desc,custom,discountPrice,originPrice,videoSrc,mediaList,operator:adminId,videoDesc,seoUrl,seoDesc,seoTitle,color,brand,location,freightInspection,skudId,priceEnsure,allergyTurn,notReason,freight,freightFree,address}));
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
        const {id,size,page,productTitle,status}=req.query;
        if(size && page){
            let result=null;
            if(id){
                result={
                    list:await productDao.detail(id),
                    total:1
                };
            }else{
                result=await productDao.list(page,size,{productTitle,status});
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
                message("Success",res,await productDao.detail(id));
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
                await productDao.delete(id)
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
        const {categoryId,skuId,productTitle,total,desc,imageUrl,mediaList,videoSrc,discountPrice,originPrice,custom,seoUrl,seoTitle,seoDesc,videoDesc,brand,color,location,freightInspection,priceEnsure,allergyTurn,notReason,freight, freightFree,address}=req.body;
        console.log(req.body);
        console.log("修改")
        try{
            if(id){
                await productDao.update(id,{categoryId,skuId,productTitle,total,imageUrl,desc,mediaList,videoSrc,discountPrice,originPrice,custom, videoDesc,seoUrl,seoTitle,seoDesc,brand,color,location,freightInspection,priceEnsure,allergyTurn,notReason,freight,freightFree,address});
                message("Success",res)
            }else{
                message("PError",res);
            }
        }catch(err){
            console.log(err)
            message("SError",res)
        }
    },
    //通过seoUrl获取详情
    getInfoBySeoUrl:async (req,res)=>{
        const {seoUrl}=req.query;
        try{
            if(seoUrl){
                message("Success",res,await productDao.getInfoBySeoUrl(seoUrl));
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
            await productDao.status(id,status);
            message("Success",res)
        }else{
            message("Prror",res)

        }
    }catch(err){
        message("Error",res)
    }
    }
}