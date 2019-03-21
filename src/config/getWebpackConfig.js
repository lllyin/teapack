const devWebpackConfig = require('./webpack-dev.config');
const prodWebpackConfig = require('./webpack-prod.config');

function getWebpackConfig({ mode = 'production' }) {
  if (mode === 'development') {
    return devWebpackConfig;
  }

  return prodWebpackConfig;
}

module.exports = getWebpackConfig;
