/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2022-10-09 21:02:48
 * @Description: 
 */
const Public = require('express').Router();
const { getImgCode,getEmailCode,upload } = require('../control/public')
Public.get('/ImgCode', getImgCode)
Public.get('/emailCode',getEmailCode)
Public.post('/upload',upload)
module.exports = Public
