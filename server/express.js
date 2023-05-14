/*
 * @Author: cly_dev 263118046@qq.com
 * @Date: 2022-10-08 22:11:48
 * @Description: express服务器
 */
const express = require('express')
const path = require('path')
const Seller=require('../server/seller');
const Bugger=require("../server/bugger");
const public = require('../server/public');
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/public', public)
app.use('/seller',Seller);
app.use('/bugger',Bugger)
app.use(express.static(path.resolve(__dirname, '../www')))

module.exports = app
