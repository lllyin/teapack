const path = require('path');

const workpath = path.resolve(__dirname);

function getWorkPath(filename){
  return path.resolve(__dirname, filename);
}

module.exports = {
  workpath,
  getWorkPath
}