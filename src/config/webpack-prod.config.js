const config = require('./webpack-base.config');

config.mode('production');
// config.devtool();

config.optimization
  .splitChunks({
    chunks: "all",
  })

module.exports = config;
