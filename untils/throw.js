const log = require("./log");
const message = require("./message");
module.exports = (fn, res) => {
  try {
    with (fn());
  } catch (err) {
    log.error(err);
    message("SError", res);
    throw err;
  }
};
