/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-12 21:11:19
 * @Description: 卖家端
 */
const Bugger=require("express").Router();
const TokenVerify =require("../../middleware/userToken");
const UserSerive=require('../../control/user');
const User=require('../../router/bugger/user')
const Message=require("../../router/public/message");
const Config=require("../../router/public/config")
Bugger.use('/config',Config)
Bugger.post('/login',UserSerive.login);
Bugger.post('/register',UserSerive.register);
Bugger.use(TokenVerify);
Bugger.use('/account',User);
Bugger.use('/message',Message)
module.exports=Bugger