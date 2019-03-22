function getWebpackConfig({ mode = 'production' }) {
  if (mode === 'development') {
    return require('./webpack-dev.config');
  }

  return require('./webpack-prod.config');
}

// console.log(getWebpackConfig({mode: 'development'}).toString())

module.exports = getWebpackConfig;
