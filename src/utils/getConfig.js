const cwd = process.cwd();
const path = require('path');
const fs = require('fs');

// const teapackConfig = require(path.resolve(cwd, 'teapack.config.js'));
const webpackFile = path.resolve(cwd, 'teapack.config.js');

module.exports = function() {
  let isExit = true;

  try {
    fs.accessSync(webpackFile);
  } catch (e) {
    isExit = false;
    console.error(`无法访问${webpackFile}`);
  }

  return isExit ? require(webpackFile) : {}
};
