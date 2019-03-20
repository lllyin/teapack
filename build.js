const webpack = require('webpack');
const chalk = require('chalk');
const { printFileSizesAfterBuild } = require('react-dev-utils/FileSizeReporter');
const getConfig = require('./config/getWebpackConfig');

const webpackConfig = getConfig;

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

webpack(webpackConfig, (err, stats) => {
  console.log('打包开始...');
  if (err) throw err;

  if(stats.hasErrors()){
    console.log(chalk.red('  Build failed with errors.\n'));
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
