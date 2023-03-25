/*
 * @Author: cly_dev 263118046@qq.com
 * @Date: 2022-10-09 20:13:46
 * @Description:通用接口
 */
const SvgCode = require('../plugin/imgCode')
const { message,emailSend,upload} = require('../untils')
const {sendRes,randomCode}=require("../untils/common");
const {host,serverPort}=require("../config/server.config")
const catchErr=require("../untils/catch");
const log = require('../plugin/log')
const redisDao=require("../dao/redisDao");
//获取图形验证码
exports.getImgCode = (req, res) => {
  //获取每个连接用户的唯一标识
  try {
    const { code } = req.query
    if (code) {
      const { data, text } = SvgCode()
      if(redisDao.setCode(code,text)){
        res.type('svg').status(200).send({
          code: '200',
          data,
          msg: 'success',
        })
      }else{
        throw new Error("redis写入失败");
      } 
    } else {
      message('PError', res)
    }
  } catch (err) {
    log.error(err)
    message('SError', res)
  }
}

//获取邮箱验证码
exports.getEmailCode=async (req,res)=>{
  try{
    const {email,checkoutCode}=req.query;
    if(email && checkoutCode){
      const code=randomCode(6)
      await emailSend(email,code)
      redisDao.setEmailCode(checkoutCode,code)
      message("Success",res,code);
    }else{
      throw catchErr('400');
    }
  }catch(err){
    console.log(err);
    sendRes(err,res)
  }
}

//上传文件
exports.upload=async (req,res)=>{
  try{
  message("Success",res,`${host}:${3000}${await upload(req)}`)
  }catch(err){
    console.log(err)
    message("SError",res)
  }
  
}