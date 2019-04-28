const getConfig = require('../utils/getConfig');
const customerConfig = getConfig();

function getWebpackConfig({ mode = 'production' }) {
  const { cssModules = true, ...webpackrc } = customerConfig;
  let newConfig = {};

  if (mode === 'development') {
    process.env.NODE_ENV = 'development';
    newConfig = require('../config/webpack-dev.config');
  }
  if (mode === 'production') {
    process.env.NODE_ENV = 'production';
    newConfig = require('../config/webpack-prod.config');
  }
  newConfig.module
    .rule('less')
    .use('css')
    .tap(options => {
      return {
        ...options,
        modules: Boolean(cssModules)
      }
    })
  return newConfig.merge(webpackrc);
}

module.exports = getWebpackConfig;
