/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-22 21:02:30
 * @Description: 内容配置
 * 
 */
const configModel =require("../model/config");
const {getParams}=require("../untils/common")
module.exports={
    //新增
    create:(data)=>{
        const config=new configModel({...data,createTime:Date.now()});
        return config.save();
    },
    //改变状态
    status:(_id,status)=>{
       return configModel.updateOne({_id},{$set:{status}})
    },
    //修改状态
    update:(_id,data)=>{
        const obj=getParams(data);
        return configModel.updateOne({_id},{$set:{...obj}})
    },
    //删除
    delete:(_id)=>{
       return configModel.deleteOne({_id})
    },
    //获取配置详情
    detail:(_id)=>{
       return configModel.findOne({_id})
    },
    //获取列表
    list:async(page,size,parmas)=>{
        const obj=getParams(parmas);
        const filters=[];
        for(let key in obj){
            filters.push({
                [key]:key==='configTitle'?new RegExp(obj[key]): obj[key]
            })
        }
        return {
         list:await configModel.find({$or:filters}).sort({createTime:'desc'}).skip((page - 1) * size).limit(size),
         total:await configModel.countDocuments({$or:filters})
        }
    },
    find:async(page,size,location)=>{
        const filters=[{
            $match:{
                location,
                status:'0'
            }  
        }];
        if(location==='product' || location==='banner'){
            filters.push({
                $lookup:{
                    from:'product',
                    //将itemId
                    let:{localID:{$toString:'$itemId'}},
                    pipeline:[
                        { $match: { $expr: { $eq: [{ $toString: "$_id" }, "$$localID"] } } }
                    ],
                    as:'itemData'
                }
            },{
                $unwind:'$itemData'
        })
        }else if(['category','hotCategory','activity'].includes(location)){{
                filters.push({
                    $lookup:{
                        from:'category',
                        let:{localID:{$toString:'$itemId'}},
                        pipeline:[
                            {
                                $match:{
                                    $expr:{
                                        $eq:[{$toString:'$_id'},'$$localID']
                                    }
                                }
                            }
                        ],
                        as:'itemData'
                    }
                 },{
                $unwind:'$itemData'
            })
        }} 
        filters.push({
            $skip:(page - 1) * size
        },{
            $limit:size
        })
        return await configModel.aggregate(filters)
    },
    //获取类型的集合
    collection:async function(){
        return {
            notice:await this.find(1,5,'notice'),
            banner:await this.find(1,6,'banner'),
            category:await this.find(1,20,'category'),
            hotCategory:await this.find(1,4,'hotCategory'),
            product:await this.find(1,20,'product'),
            activity:await this.find(1,1,'activity')
        }
    }
}