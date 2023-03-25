/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 21:57:12
 * @Description: 发送邮件
 */
const nodemailer = require("nodemailer");
const config = require("./SMTP.config");
const catchErr=require("../catch");

//建立一个SMTO客户端配置对象
const transporter = nodemailer.createTransport(config);
function SendEmail(to, code) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        //发件人 邮箱 '昵称<发件人邮箱>'
        from: "美妆商品<2663118046@qq.com>",
        //主题
        subject: "验证邮箱",
        //收件人邮箱
        to,
        //内容
        text: `您的验证码为:${code},请在10分钟内完成验证`,
        //添加html标签
      },
      (err, info) => {
        if (err) {
          reject(catchErr("500",err));
        } else {
          resolve(true);
        }
        transporter.close();
      }
    );
  });
}

module.exports = SendEmail;
