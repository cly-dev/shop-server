/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-05 21:15:36
 * @Description:类目
 */
const categoryModel=require("../model/category");
const {ObjectId }=require("mongodb")
const seoDao=require('./seoDao')
const {getParams}=require('../untils/parameter')
//创建
module.exports={
    //创建
    create: async(data)=>{
        const {seoUrl,seoTitle,seoDesc}=data;
        await seoDao.create({seoUrl,seoTitle,seoDesc})
        const category=new categoryModel(data);
        return  category.save();
    },
    //查看某个类目
    detail:(_id)=>{
        return new Promise((resolve,reject)=>{
            categoryModel.aggregate([
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
            list:await categoryModel.find({$or:filters}).sort({createTime:'desc'}).skip((page - 1) * size).limit(size),
            total:await categoryModel.countDocuments({$or:filters})
        }
    },
    //查询树列表
    tree:async ()=>{
      return  categoryModel.aggregate([
            // 通过 $unwind 操作展开 categories 数组
            { $unwind: '$categories' },
            // 筛选出 parentId 为 0 的一级类目
            { $match: { 'categories.parentId': '0' } },
            // 将一级类目的 _id 字段转为字符串类型
            { $addFields: { 'categories._id': { $toString: '$categories._id' } } },
            // 使用 $lookup 操作查询与该一级类目关联的二级类目
            {
              $lookup: {
                from: 'products',
                let: { categoryId: '$categories._id' },
                pipeline: [
                  { $unwind: '$categories' },
                  { $match: { $expr: { $eq: ['$categories.parentId', '$$categoryId'] } } },
                  { $project: { _id: 1, name: 1, parentId: '$categories.parentId' } }
                ],
                as: 'categories.subcategories'
              }
            },
            // 将二级类目的 _id 字段转为字符串类型
            { $addFields: { 'categories.subcategories._id': { $toString: '$categories.subcategories._id' } } },
            // 以树形结构返回查询结果
            { $graphLookup: {
                from: 'products',
                startWith: '$_id',
                connectFromField: '_id',
                connectToField: 'categories.subcategories.parentId',
                as: 'categories.subcategories.subcategories'
              }
            }
          ])
    },
    //修改
    update:(_id,data)=>{
        const params=getParams(data);
        console.log(data);
        return categoryModel.updateOne({_id},{$set:params});
    },
    //修改上架状态
    status:function(_id,status){
       return this.update({_id},{status})
    },
    //删除商品
    delete:(_id)=>{
      return  categoryModel.deleteOne({_id});
    },
    //添加商品
    addItems:(_id,items)=>{
        categoryModel.updateOne({_id},{$push:{itemList:items}})
    },
    //通过seoUrl查看类目详情
    getInfoBySeoUrl:(seoUrl)=>{
      return categoryModel.findOne({seoUrl});
    }
    
}