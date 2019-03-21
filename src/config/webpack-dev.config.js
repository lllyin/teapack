const config = require('./webpack-base.config');

config.mode('development');
config.devtool('eval-source-map');

module.exports = config;
