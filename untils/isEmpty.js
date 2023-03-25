/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 21:57:12
 * @Description: 
 */
module.exports = (data) => {
  if (Array.isArray(data)) {
    return data.length > 0
  }
  if (JSON.stringify(data) !== "{}") {
    return true;
  }
  if (data) {
    return true;
  }
  return false;
};
