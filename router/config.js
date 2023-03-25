/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-02 21:28:00
 * @Description: 内容配置
 */
const configService=require("../control/config");
const Config=require("express").Router();
//新增
Config.post('/create',configService.create);
//状态
Config.put('/status/:id',configService.status);
//更新
Config.put('/update/:id',configService.update)
//删除
Config.delete('/delete',configService.delete);
//列表
Config.get('/list',configService.list)
module.exports=Config