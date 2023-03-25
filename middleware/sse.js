let sse = null;
module.exports = (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
  });
  sse = res;
};
exports.sse = sse;
