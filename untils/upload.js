/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 21:57:12
 * @Description: 
 */
const multiparty = require("multiparty");
const Fs = require("./fs");
const ph = require("path");
// TODO --未完成
function upload(req) {
  const fs = new Fs();
  const h=ph.resolve(__dirname,'../www','./images');
  console.log(h)
  //上传文件设置
  const form = new multiparty.Form({ encoding: "utf-8", uploadDir: h });
  return new Promise((resolve, reject) => {
    //劫持请求体
    form.parse(req, (err, fields, files) => {

      if (!err) {
          const { path, originalFilename } = files['file'][0];
       
          console.log('-=----------------')
          //文件名
          fs.handleReName(path,h  + '/' + originalFilename)
          resolve(ph.join('/images',originalFilename));
      } else {
        reject(err);
      }
    });
  });
}
module.exports = upload;
