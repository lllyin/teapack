var program = require('commander');
var package = require('../../package.json');

const { name, version } = package;


program
  .version(`${name} ${version}`)
  .option('-d, --debug', 'debug and print all errors')
  .option('-D, --development', 'development mode')
  .option('-P, --production', 'production mode')
  .parse(process.argv);

  if(program.args[0] === 'dev'){
    console.log('$ teapack dev');
  }

module.exports = program;
