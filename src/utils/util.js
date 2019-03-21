const path = require('path');

const workpath = path.resolve(__dirname);

function getWorkPath(filename) {
  return path.resolve(__dirname, filename);
}

// 简单处理webpack编译时的错误
function handleWebpackErrors(stats) {
  const info = stats.toJson();
  const { errors = [] } = info;

  errors.forEach(err => {
    console.error(err.toString());
  });
}

// 简单处理webpack警告信息
function handleWebpackWarnings(stats){
  const info = stats.toJson();
  const { warnings = [] } = info;

  warnings.forEach(warn => {
    console.warn(warn.toString());
  });
}

module.exports = {
  workpath,
  getWorkPath,
  handleWebpackErrors,
  handleWebpackWarnings
};
