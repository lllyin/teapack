const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('./webpack-base.config');

config.mode('development');
config.devtool('eval-source-map');


config.devServer
  .hot(true)
  .inline(true);

config.plugin('clean-webpack')
    .use(CleanWebpackPlugin)
    .end()
    .plugin('hmr')
    .use(webpack.HotModuleReplacementPlugin);
    

// const arr = makeArray(config.entry('index'));

// console.log('config', config.toString());

module.exports = config;
