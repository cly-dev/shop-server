/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-05-06 23:11:28
 * @Description: 
 */
/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2022-10-09 21:02:48
 * @Description: 
 */
const Public = require('express').Router();
const { getImgCode,getEmailCode,upload } = require('../../control/public');
const Config=require('../../router/public/config');
const Product=require('../../router/public/product');
const Search=require('../../router/public/search');
const Category=require("../../router/public/category");
Public.get('/ImgCode', getImgCode)
Public.get('/emailCode',getEmailCode)
Public.post('/upload',upload);
Public.use('/config',Config);
Public.use('/product',Product)
Public.use('/search',Search)
Public.use('/category',Category);
module.exports = Public
