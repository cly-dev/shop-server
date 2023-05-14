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
        return categoryModel.findOne({_id});
    },
    //获取列表
    list:async (page,size,params)=>{
        const filters={};
        if(params?.level){
            Object.assign(filters,{
              level:params.level
            })
        }
        if(params?.title){
          Object.assign(filters,{categoryTitle:{$regex:new RegExp(params?.title)}})
        }
        if(params?.status){
          Object.assign(filters,{status:params.status})
        }
        console.log(filters)
        return {
            list:await categoryModel.find(filters).sort({createTime:'desc'}).skip((page - 1) * size).limit(size),
            total:await categoryModel.countDocuments(filters)
        }
    },
    //查询树列表
    tree:(parmas)=>{
      const filter=[{
        $match:{
          level:'1'
        }
      }, {
              $graphLookup: {
                from: 'category',
                startWith: '$_id',
                connectFromField: '_id',
                connectToField: 'parentId',
                as: 'children',
                maxDepth: 10 // 设置最大递归深度，避免无限递归
              }
            }]
        if(!parmas){
          filter.unshift( {
              $match: {
                parentId: '0',
              }
            })
        }else{
        filter.unshift( {
              $match: parmas
            })
        }
      return categoryModel.aggregate(
    // 从顶层类目开始递归
           filter
            // 通过 $unwind 操作展开 categories 数组
            // { $unwind: '$categories' },
            // 筛选出 parentId 为 0 的一级类目
            // { $match: { 'categories.parentId': '0' } },
            // 将一级类目的 _id 字段转为字符串类型
            // { $addFields: { 'categories._id': { $toString: '$categories._id' } } },
            // 使用 $lookup 操作查询与该一级类目关联的二级类目
            // {
            //   $lookup: {
            //     from: 'category',
            //     let: { categoryId: '$categories._id' },
            //     pipeline: [
            //       { $unwind: '$categories' },
            //       { $match: { $expr: { $eq: ['$categories.parentId', '$$categoryId'] } } },
            //       { $project: { _id: 1, name: 1, parentId: '$categories.parentId' } }
            //     ],
            //     as: 'categories.subcategories'
            //   }
            // },
            // // 将二级类目的 _id 字段转为字符串类型
            // { $addFields: { 'categories.subcategories._id': { $toString: '$categories.subcategories._id' } } },
            // // 以树形结构返回查询结果
            // { $graphLookup: {
            //     from: 'category',
            //     startWith: '$_id',
            //     connectFromField: '_id',
            //     connectToField: 'categories.subcategories.parentId',
            //     as: 'categories.subcategories.subcategories'
            //   }
            // }
          )
    },
    //修改
    update:(_id,data)=>{
        const params=getParams(data);
        console.log(params);
        console.log('1111231')
       return categoryModel.updateOne({_id},{$set:params})
    
    },
    //修改上架状态
    status:function(_id,status){
      const arr=[ this.update({_id},{status})];
      if(status==='1'){
        arr.push( categoryModel.updateMany({parentId:_id},{$set:{status}}));
      }
       return Promise.allSettled(arr)
    },
    //删除
    delete:(_id)=>{
      return  categoryModel.deleteOne({_id});
    },
    //添加
    addItems:(_id,items)=>{
        categoryModel.updateOne({_id},{$push:{itemList:items}})
    },
    //通过seoUrl查看类目详情
    getInfoBySeoUrl:(seoUrl)=>{
      return categoryModel.findOne({seoUrl});
    },
    //获取子类目
    getChildrenByParentId:(parentId,level)=>{
      return categoryModel.find({
        level,
        parentId
      })
    },
    //获取详情
    getDatailById:(_id)=>{
      return categoryModel.aggregate([{
        $match:{
          _id:new ObjectId(_id),
        }
      },{
        $lookup:{
          from:'category',
          let:{localID:{$toString:'$_id'}},
          pipeline:[{
                      $match:{
                                    $expr:{
                                        $eq:[{$toString:'$parentId'},'$$localID']
                                    }
                                }
                            }],
          as:'list'
        }
      }])
    }
    
}