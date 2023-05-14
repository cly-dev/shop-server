/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-12 21:11:19
 * @Description: 卖家端
 */
const Seller=require("express").Router();
const TokenVerify =require("../../middleware/token");
const AdminSerive=require('../../control/admin');
const Admin=require("../../router/seller/admin");
const Config=require('../../router/seller/config');
const Product=require('../../router/seller/product');
const Category=require("../../router/seller/category");
const Message=require("../../router/seller/message")
Seller.post('/login',AdminSerive.login);
Seller.use(TokenVerify);
Seller.use('/admin',Admin);
Seller.use('/config',Config)
Seller.use("/product",Product);
Seller.use('/category',Category);
Seller.use('/message',Message);
module.exports=Seller