/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 20:47:22
 * @Description: 连接mongodb
 */
const {mongodbConfig}=require("../config/server.config");
const mongoose= require("mongoose");
mongoose.set('strictQuery', true);
const baseurl = `mongodb://${mongodbConfig.host}:${mongodbConfig.port}/${mongodbConfig.dataBase}`;
mongoose.connect(baseurl, { useNewUrlParser: true, useUnifiedTopology: true });
let dbHandle=mongoose.connection;
//监听连接错误
dbHandle.on("error", (err) => {
    console.log("连接异常");
  });
  //监听连接断开
  dbHandle.on("disconnected", () => {
    console.log("连接断开");
  });
  //监听连接
  dbHandle.on("open", (err) => {
    try {
      if (err) {
        console.log("数据库连接失败");
        throw err;
      } else {
        console.log("数据库连接成功");
      }
    } catch (e) {
      throw e;
    }
  });
  module.exports = mongoose;