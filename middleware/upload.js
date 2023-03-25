const { upload, message, fs } = require("../Api");
const ph = require("path");
module.exports = async (req, res) => {
  try {
    const { type } = req.query;
    const { id } = req.headers;
    if (type) {
      const f = new fs();
      // 生成文件目录
      const src = ph.resolve(__dirname, "../www", id, type);
      await f.init(ph.resolve(__dirname, "../www", id));
      console.log(src);
      upload(req, await f.init(src), type, res, (resolve, type, path) => {
        if (type !== "jpg" && type !== "png" && type != "gif") {
          message("FError", res, "请检查文件类型");
          resolve(false);
          f.handleDeleteFile(path);
        }
      }).then((data) => {
        const { path, originalFilename } = data[0];
        const { name } = ph.parse(originalFilename);
        const newName =
          `/${Date.now()}-type-` + name + ph.extname(originalFilename);
        f.handleReName(path, src + newName).then(() => {
          const filePath = ph.join("/", id, type, newName);
          message("Success", res, filePath);
        });
      });
    } else {
      message("PError", res);
    }
  } catch (err) {
    message("SError", res);
    throw err;
  }
};
