const path = require('path');
const chalk = require('chalk');


const workpath = path.resolve(__dirname);

function getWorkPath(filename) {
  return path.resolve(__dirname, filename);
}

// 简单处理webpack编译时的错误
function handleWebpackErrors(stats) {
  const info = stats.toJson();
  const { errors = [] } = info;

  errors.forEach(err => {
    const errStr = err.toString();

    console.error(chalk.red(errStr));
  });
}

// 简单处理webpack警告信息
function handleWebpackWarnings(stats){
  const info = stats.toJson();
  const { warnings = [] } = info;

  warnings.forEach(warn => {
    const warnStr = warn.toString();
    
    console.warn(chalk.yellow(warnStr));
  });
}

module.exports = {
  workpath,
  getWorkPath,
  handleWebpackErrors,
  handleWebpackWarnings
};
