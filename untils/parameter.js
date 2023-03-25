/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 21:57:12
 * @Description: 
 */
//对可选参数进行筛选
module.exports = {
  getParams: (obj) => {
    for (let key in obj) {
      if (!obj[key]) {
        delete obj[key];
      }
    }
    return obj;
  },
  getData: (arr, data) => {
    const obj = {};
    arr.forEach((v) => {
      if (data[v]) {
        obj[v] = data[v];
      }
    });
    if (Object.keys(obj).length) {
      return obj;
    }
    return false;
  },
  // 对参数进行判断
  calltor: (res, callback, ...data) => {
    (async (callback) => {
      const result = await res(...data);
      if (result != true && typeof result != "object") {
        callback(result);
      } else {
        callback(null, result);
      }
    })(callback);
  },
};
