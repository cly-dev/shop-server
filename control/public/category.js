/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-05 21:35:01
 * @Description: 
 */
//@Module:Category
const { ObjectId } = require('mongodb');
const categoryDao=require('../../dao/category');
const {message} =require("../../untils");
const { getParams } = require('../../untils/parameter');
module.exports={
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
                message("Success",res,await categoryDao.getDatailById(id));
            }else{
                message("PError",res)
            }
        }catch(err){
            console.log(err)
            message("SError",res)
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
      //@get:children
    children:async (req,res)=>{
        try{
            const {level,categoryId}=req.query;
            if(level && categoryId){
                message('Success',res,await categoryDao.getChildrenByParentId(categoryId,level))
            }else{
                message("PError",res);
            }
        }catch(err){
            message("SError",res)
        }
    }
  
}