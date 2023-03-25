const async = require("async");

const task1 = function (backcall) {
  backcall(null, "task1");
};
const task2 = function (backcall) {
  backcall(null, "task2");
};
const task3 = function (backcall) {
  setTimeout(() => {
    backcall(null, "task3");
  });
};
async.series([task1, task3, task2], (err, reult) => {
  if (!err) {
    console.log(reult);
  }
});
