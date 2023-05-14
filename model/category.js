/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 21:52:18
 * @Description: 类目模型
 */
const dbHandler = require("../server/mongodb");
const mongoose=require("mongoose")
const { name, collection } = require("../collection/category");
const { ObjectId } = require("mongodb");
const CategorySchema = new dbHandler.Schema(collection);

CategorySchema.pre('save',async function(next){
    if(this.sortValue){
        const maxSortValue=await this.constructor.findOne().sort('-sortValue').exec();
        this.sortValue = (maxSortValue && maxSortValue.sortValue) ? maxSortValue.sortValue + 1 : 1;
    }
    next();
})
// CategorySchema.pre('updateOne',function(next){
//         console.log(this.parentId)
//         this.parentId=mongoose.Types.ObjectId((this.parentId ?? 0));
//         console.log(this.parentId)
//         console.log('111111')
//         next();
// })
module.exports = dbHandler.model(name, CategorySchema, name);
