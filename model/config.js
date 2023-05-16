/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-13 16:31:14
 * @Description:内容配置模型;
 */
const {name,collection} =require("../collection/config");
const dbHandler=require("../server/mongodb");
const mongoose =require("mongoose")
const ConfigSchema=new mongoose.Schema(collection);
// pre-save hook来设置sortValue字段。在pre-save hook中，我们首先检查sortValue是否已设置。如果sortValue未设置，我们通过查询数据库来获取最大的sortValue，然后将当前文档的sortValue设置为最大值加1。如果数据库中没有其他文档，则sortValue将被设置为1。
ConfigSchema.pre('save', async function(next) {
    if (!this.sortValue) {
      const maxSortValue = await this.constructor.findOne().sort('-sortValue').exec();
      this.sortValue = (maxSortValue && maxSortValue.sortValue) ? maxSortValue.sortValue + 1 : 1;
      this.createTime=Date.now()
    }
    next();
  });
module.exports=dbHandler.model(name,ConfigSchema,name)