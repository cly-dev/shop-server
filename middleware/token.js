/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 21:56:28
 * @Description: 管理
 */
const { TokenVerify, message } = require("../untils");
module.exports = (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    const obj = TokenVerify(token);
    if (obj) {
      const { adminId, power,status } = obj;
      req.headers.adminId = adminId;
      req.headers.power=power;
      req.headers.status=status
      next();
    } else {
      message("TError", res);
    }
  } else {
    message("FError", res, "未携带token");
  }
};
