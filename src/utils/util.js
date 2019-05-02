const path = require('path');
const chalk = require('chalk');
const ProgressBar = require('progress');

var green = '\u001b[42m \u001b[0m';
const bar = new ProgressBar(':title [:bar] :percent :etas', {
  complete: green,
  incomplete: ' ',
  width: 30,
  total: 100,
  clear: true
});

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

function handleWebpackMsg(msg){
  const msgMap = {
    'after module and chunk tree optimization': 'optimization',
    'building' : 'building'
  }

  const newMsg = msgMap[msg];

  return newMsg || msg; 
}

// hanle webpack build progress
function handleWebpackProgress(percentage, message){
  bar.update(percentage, {title: handleWebpackMsg(message)});
  if(bar.complete){
    if(process.env.NODE_ENV === 'development'){
      const Urls = JSON.parse(process.env.Urls);

      console.log(chalk.cyan(`\n Starting the development server on \n 
          ${Urls.lanUrlForTerminal}\n
          ${Urls.localUrlForTerminal}
        `) 
      );

    }
  }
}

module.exports = {
  workpath,
  getWorkPath,
  handleWebpackErrors,
  handleWebpackWarnings,
  handleWebpackProgress
};
