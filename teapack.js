#!/usr/bin/env node

const getWebpackConfig = require('./src/config/getWebpackConfig');
const program = require('./src/config/cmd-options');
const dev = require('./src/dev');
const build = require('./src/build');

const cwd = process.cwd();
// const Config = getWebpackConfig({});

function debugTeapack(config) {
  console.info(config.toString());
}

// 开发调试
if (program.args[0] === 'dev') {
  const Config = getWebpackConfig({ mode: 'development' });
  const webpackConfig = Config.toConfig();

  program.debug && debugTeapack(Config);
  dev({ cwd, webpackConfig });
}

// 生产构建
if (program.args[0] === 'build') {
  const Config = getWebpackConfig({ mode: 'production' });
  const webpackConfig = Config.toConfig();

  program.debug && debugTeapack(Config);
  build({ cwd, webpackConfig });
  // Config.devtool('eval-source-map');
}
