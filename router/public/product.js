/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-03-02 23:04:41
 * @Description: 
 */
const Product=require("express").Router();
const productService =require("../../control/public/product");
const {moduleSerive} =require("../../untils/common");
const modules=moduleSerive('public','product');
modules.forEach((item)=>{
    Product[item.type](`/${item.path}`,productService[item.method])
})
module.exports=Product;