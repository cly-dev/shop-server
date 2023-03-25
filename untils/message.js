/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-02-10 21:57:12
 * @Description: 
 */
const async = require("async");
const tips=require("../constant/tips")
function message(code, msg, data = null, obj = {}) {
  return {
    code,
    msg,
    data,
    ...obj,
  };
}
//策略对象
const Strategies = {
  //token失效
  TError: function (res, msg=tips['401']) {
    res.status(200).send(message("401", msg));
    return false;
  },
  //参数不足
  PError: function (res, msg = tips['400']) {
    res.status(200).send(message("400", msg));
    return false;
  },
  //系统出错
  SError: function (res, msg = tips['500']) {
    res.status(200).send(message("500", msg));
    return false;
  },
  //查询结果出错
  FError: function (res, msg=tips['501']) {
    res.status(200).send(message("501", msg));
    return false;
  },
  //成功
  Success: function (res, data = null, obj = {}) {
    res.status("200").send(message("200", (msg = "成功"), data, obj));
    return true;
  },
  //串行执行流程判断
  Series: function (res, fn) {
    async.series(fn, (err, doc) => {
      if (err) {
        if (err === true) {
          this.Success(res);
        } else {
          this.FError(res, err);
        }
        return;
      }
      const data = Array.isArray(doc) ? doc.filter((v) => v !== true) : [];
      this.Success(res, data.length ? data[0] : null);
    });
  },
  // 串行任务执行
  Waterfall: function (res, fn, obj = {}) {
    async.waterfall(fn, (err, doc) => {
      if (err) {
        this.FError(res, err);
      }
      this.Success(res, doc, obj);
    });
  },
  // 平行任务执行
  Parallel: function (res, fn) {
    async.parallel(fn, (err, doc) => {
      if (err) {
        if (err) {
          if (err === true) {
            this.Success(res);
          } else {
            this.FError(res, err);
          }
        }
        return;
      }
      const data = Array.isArray(doc) ? doc.filter((v) => v !== true) : [];
      this.Success(res, data.length ? data[0] : null);
    });
  },
  //参数类型错误
  TypeError: function (res, msg = "请检查类型参数") {
    res.status("200").send(message("500", msg));
  },
  //判断结果
  DecideRes: function (res, result, obj = {}) {
    if (typeof result === "string") {
      this.FError(res, result);
    } else {
      let data;
      data = result === true ? null : result;
      this.Success(res, data, obj);
    }
  },
};
//执行策略对象
module.exports=function calculateBonus(level, res, msg, data = "", obj = {}, callback = "") {
  data = data ? data : callback;
  Strategies[level](res, msg, data, obj);
}


