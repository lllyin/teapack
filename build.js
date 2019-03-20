#!/usr/bin/env node

const webpack = require('webpack');
const chalk = require('chalk');
const { printFileSizesAfterBuild } = require('react-dev-utils/FileSizeReporter');
const Config = require('./config/getWebpackConfig');
const program = require('./config/cmd-options');

// 开发模式
if(program.development){
  Config.mode('development');
  Config.devtool('eval-source-map');
}
// 生产模式
if(program.production){
  Config.mode('production');
  // Config.devtool('eval-source-map');
}

// 调试模式
if(program.debug){
  console.info(Config.toString());
}

const webpackConfig = Config.toConfig();

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

webpack(webpackConfig, (err, stats) => {
  console.log('打包开始...');
  if (err) {
    console.log(chalk.red('  Start failed with errors.\n'));
    console.error(err);
  }

  if(stats.hasErrors()){
    console.log(chalk.red('  Build failed with errors.\n'));
    program.debug && console.error(stats);
    process.exit(1);
  }

  console.log('File sizes after gzip:\n');
  printFileSizesAfterBuild(
    stats,
    {
      root: webpackConfig.output.path,
      sizes: {},
    },
    webpackConfig.output.path,
    WARN_AFTER_BUNDLE_GZIP_SIZE,
    WARN_AFTER_CHUNK_GZIP_SIZE,
  );
  console.log(chalk.cyan('  Build complete.\n'));
});
