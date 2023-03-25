/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-05 22:16:38
 * @Description: 
 */
const Product=require("express").Router();
const ProductService=require('../../control/product');
//新建
Product.post('/create',ProductService.create);
//获取列表
Product.get('/list',ProductService.list);
//获取详情
Product.get('/detail',ProductService.detail);
//状态
Product.put('/status/:id',ProductService.status);
//删除
Product.delete('/delete',ProductService.delete);
//修改
Product.put('/update/:id',ProductService.update);

module.exports=Product;