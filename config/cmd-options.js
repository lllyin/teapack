var program = require('commander');
var package = require('../package.json');

const { name, version } = package;


program
  .version(`${name} ${version}`)
  .option('-d, --debug', 'debug and print all errors')
  .option('-dev, --development', 'development mode')
  .option('-prod, --production', 'production mode')
  .parse(process.argv);

module.exports = program;
