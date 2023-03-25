/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 21:52:18
 * @Description: 类目模型
 */
const dbHandler = require("../server/mongodb");
const { name, collection } = require("../collection/category");
const CategorySchema = new dbHandler.Schema(collection);
module.exports = dbHandler.model(name, CategorySchema, name);
