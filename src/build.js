const webpack = require('webpack');
const chalk = require('chalk');
const { printFileSizesAfterBuild } = require('react-dev-utils/FileSizeReporter');
const program = require('./config/cmd-options');
const { handleWebpackErrors, handleWebpackWarnings } = require('./utils/util');

const debug = require('debug')('teapack:build');

function build({ 
  webpackConfig,
  onFail = handleWebpackErrors,
  onWarn = handleWebpackWarnings
}) {
  const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
  const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

  process.env.NODE_ENV = 'production';

  debug('build start');
  webpack(webpackConfig, (err, stats) => {
    debug('build done');

    // console.log('打包开始了...');
    if (err) {
      console.log(chalk.red('  Start failed with errors.\n'));
      console.error(err);
    }

    if (stats.hasWarnings()) {
      onWarn(stats);
    }

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      onFail(stats);
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
}

module.exports = build;
