/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-05 21:35:01
 * @Description: 
 */
//@Module:Category
const { ObjectId } = require('mongodb');
const mongoose =require("mongoose")
const categoryDao=require('../../dao/category');
const {message} =require("../../untils");
const { getParams } = require('../../untils/parameter');
module.exports={
    //@post:create
    create:async (req,res)=>{
        try{
        const {adminId}=req.headers;
        const {itemList,title,iconUrl,desc,imageUrl,level,parentId,seoUrl,seoTitle,seoDesc,orderValue}=req.body;
        if(title && seoUrl && seoTitle){
            message("Success",res,await categoryDao.create({itemList,iconUrl,level,parentId:parentId,categoryTitle:title,imageUrl,desc,operator:adminId,seoUrl,seoDesc,seoTitle,orderValue}));
        }else{
            message("PError",res)
        }
    }catch(err){
        console.log(err);
        message("SError",res)
    }
    },
    //@get:list
    //获取列表
    list:async (req,res)=>{
        try{
        const {id,size,page,title,status,level}=req.query;
        if(size && page){
            let result=null;
            if(id){
                result={
                    list:await categoryDao.detail(id),
                    total:1
                };
            }else{
                result=await categoryDao.list(page,size,{title,status,level});
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
    //@get:detail
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
    //@put:update/:id
    //修改
    update:async (req,res)=>{
        const {id}=req.params;
        const { title,desc,iconUrl,level,itemList,seoTitle,seoDesc,seoUrl,sortValue,parentId}=req.body;
        console.log(req.body)
        try{
            if(id){
                await categoryDao.update(id,{iconUrl,categoryTitle:title,itemList,desc,iconUrl,seoDesc,seoTitle,seoUrl,sortValue,parentId:mongoose.Types.ObjectId(parentId==='0'?0:parentId),level});
                message("Success",res)
            }else{
                message("PError",res);
            }
        }catch(err){
            console.log(err)
            message("SError",res)
        }
    },
    //@put:status/:id
    status:async (req,res)=>{
        const {id}=req.params;
        const {status}=req.body;
        try{
            if(id){
                await categoryDao.status(id,status);
                message("Success",res);
            }else{
                message("PError",res);
            }
        }catch(err){
            message("SError",res);
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
    //@put:status/:id
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
    },
    //获取类目树形结构
    //@get:tree
    tree:async (req,res)=>{
        try{
            const {status,title,id}=req.query;
            message("Success",res,await categoryDao.tree(getParams({ categoryTitle:title?{$regex:new RegExp(title)}:'',status,_id:id?new ObjectId(id):''})))
        }catch(err){
            message("SError",res)
        }
    },
    //删除
    //@delete:del
    del:async (req,res)=>{
        try{
            const {id}=req.query
            if(id){
                message("Success",res,await categoryDao.delete(id))
            }else{
                message("PError",res);
            }
        }catch(err){
            message("SError",res)
        }
    },
    //获取父类目信息
  
    
}