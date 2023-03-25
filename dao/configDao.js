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
        const config=new configModel(data);
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
    delete:(ObjectId)=>{
       return configModel.deleteOne({ObjectId})
    },
    //获取配置详情
    get:(ObjectId)=>{
       return configModel.findById({ObjectId})
    },
    //获取列表
    list:async(page,size,parmas)=>{
        const obj=getParams(parmas);
        const filters=[];
        for(let key in obj){
            filters.push({
                [key]:obj[key]
            })
        }
        return {
         list:await configModel.find({$or:filters}).sort({createTime:'desc'}).skip((page - 1) * size).limit(size),
         total:await configModel.countDocuments({$or:filters})
        }
    },
    //获取类型的集合
    collection:async function(){
        console.log(this)
        return {
            notice:await this.list(1,5,{location:'notice'}),
            banner:await this.list(1,6,{location:'banner'}),
            category:await this.list(1,20,{location:' category'}),
            hotCategory:await this.list(1,4,{location:'hotCategory'}),
            product:await this.list(1,20,{location:'product'}),
            activity:await this.list(1,1,{location:'activity'})
        }
    }
}