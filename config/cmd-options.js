var program = require('commander');
var package = require('../package.json');

const { name, version } = package;


program
  .version(`${name} ${version}`)
  .option('-d, --debug', 'debug and print all errors')
  .parse(process.argv);

module.exports = program;
