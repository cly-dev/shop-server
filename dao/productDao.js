/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-05 21:15:36
 * @Description: 
 */
const productDao=require("../model/product");
const {ObjectId }=require("mongodb")
const seoDao=require('./seoDao')
const {getParams}=require('../untils/parameter')
//创建商品
module.exports={
    //创建
    create: async(data)=>{
        const {seoUrl,seoTitle,seoDesc}=data;
        await seoDao.create({seoUrl,seoTitle,seoDesc})
        const product=new productDao(data);
        return  product.save();
    },
    //查看某个商品
    detail:(_id)=>{
        return new Promise((resolve,reject)=>{
            productDao.aggregate([
                {
                    $match:{
                        _id:new ObjectId(_id)
                    }
                }, {
                    $lookup: {
                      from: "seo",
                      localField: "seoUrl",
                      foreignField: "seoUrl",
                      as: "seo",
                    },
                  }
            ]).exec().then((doc)=>{
                if(doc.length > 0){
                resolve(doc[0])
                }else{
                    resolve(null)
                }
            }).catch((err)=>{
                reject(err);
            })
        }) 
    },
    //获取列表
    list:async (page,size,params)=>{
        const data=getParams(params);
        const filters=[];
        for(let key in data){
            filters.push({
                [key]:new RegExp(data[key])
            })
        }
        return {
            list:await productDao.find({$or:filters}).sort({createTime:'desc'}).skip((page - 1) * size).limit(size),
            total:await productDao.countDocuments({$or:filters})
        }
    },
    //修改
    update:(_id,data)=>{
        const params=getParams(data);
        return productDao.updateOne({_id},{$set:params});
    },
    //修改上架状态
    status:function(_id,status){
       return this.update({_id},{status})
    },
    //删除商品
    delete:(_id)=>{
      return  productDao.deleteOne({_id});
    },
    //通过seoUrl查看商品详情
    getInfoBySeoUrl:(seoUrl)=>{
      return productDao.findOne({seoUrl});
    }
}