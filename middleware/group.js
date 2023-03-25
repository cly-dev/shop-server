const { message } = require("../untils");
const groupDao = require("../Curd/group");
module.exports = async (req, res, nuxt) => {
  try {
    const groupId = req.body.groupId ? req.body.groupId : req.query.groupId;
    if (groupId) {
      const data = await groupDao.findGroupIsSave(groupId);
      if (data) {
        req.headers.adminId = data.adminId;
        req.headers.groupName = data.groupName;
        req.headers.list = data.list;
        nuxt();
      } else {
        message("FError", res, "该群聊不存在");
      }
    } else {
      nuxt();
    }
  } catch (err) {
    message("SError", res);
  }
};
