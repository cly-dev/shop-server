/*
 * @Author: cly_dev 263118046@qq.com
 * @Date: 2022-10-08 22:11:48
 * @Description:服务器
 */
const app = require('./server/express')
const {serverPort}=require("./config/server.config")

//token检验
app.listen(serverPort, () => {
  console.log('服务器启动成功')
})
