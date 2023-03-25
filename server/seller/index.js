/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-12 21:11:19
 * @Description: 卖家端
 */
const Seller=require("express").Router();
const TokenVerify =require("../../middleware/token");
const AdminSerive=require('../../control/admin');
const Admin=require("../../router/admin");
const Config=require('../../router/config');
const Product=require('../../router/seller/product');
Seller.post('/login',AdminSerive.login);
Seller.use(TokenVerify);
Seller.use('/admin',Admin);
Seller.use('/config',Config)
Seller.use("/product",Product);
module.exports=Seller