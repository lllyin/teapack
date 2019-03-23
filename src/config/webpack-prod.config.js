const autoprefixer = require.resolve('autoprefixer');
const config = require('./webpack-base.config');

config.mode('production');
// config.devtool();

config.module
  .rule('less')
  .test(/\.(le|c)ss$/)
  .use('style')
    .loader(require.resolve('style-loader'))
    .end()
  .use('css')
    .loader(require.resolve('css-loader'))
    .options({
      sourceMap: false,
      modules: true,
      importLoaders: 2,
      localIdentName: "[local]___[hash:base64:5]"
    })
    .end()
  .use('post-css')
    .loader(require.resolve('postcss-loader'))
    .options({
      plugins: () => [
        require(autoprefixer)({
          browsers : ['> 1%', 'last 2 versions']
        })
      ]
    })
    .end()
  .use('less')
    .loader(require.resolve('less-loader'))
    .end();

config.optimization
  .splitChunks({
    chunks: "all",
  })

module.exports = config;
