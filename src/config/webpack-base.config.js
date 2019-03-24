// Require the webpack-chain module. This module exports a single
// constructor function for creating a configuration API.
const Config = require('webpack-chain');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

// Instantiate the configuration with a new API
const config = new Config();
// 执行命令的路径
const cwd = process.cwd();

// Make configuration changes using the chain API.
// Every API call tracks a change to the stored configuration.

config
  // Interact with entry points
  .entry('index')
  .add(path.resolve(cwd, 'src/index.js'))
  .end()
  // Modify output settings
  .output.path(path.resolve(cwd, 'dist'))
  .filename('[name].bundle_[hash:8].js');

// Create named rules which can be modified later
config.module
  .rule('js')
  .test(/\.js$/)
  .include.add(path.resolve(cwd, 'src'))
  .end()
  .use('babel')
    .loader(require.resolve('babel-loader'))
    .options({
      presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-react')],
      plugins: [ 
        require.resolve('@babel/plugin-transform-runtime'),
        [require.resolve('@babel/plugin-proposal-decorators'),{ "legacy": true }],
        [require.resolve('@babel/plugin-proposal-class-properties'), {"loose" : true }],
        require.resolve('@babel/plugin-syntax-dynamic-import')]
    });

config.module
    .rule('image-file')
    .test(/\.(png|svg|jpg|jpeg|gif)$/)
    .use('file-loader')
      .loader(require.resolve('file-loader'))
      .options({
        name: '[name]_[hash:8].[ext]',
      })

config.plugin('clean-webpck')
        .use(CleanWebpackPlugin)
        .end()
      .plugin('HtmlWebPackPlugin')
        .use(HtmlWebPackPlugin, [{
          template: path.resolve(cwd, 'public/index.html'),
          filename: 'index.html'
        }])
// console.log(config.toString())
// config
//   .plugin('clean')
//     .use(CleanPlugin, [['dist'], { root: '/dir' }]);
// Export the completed configuration object to be consumed by webpack
module.exports = config;
