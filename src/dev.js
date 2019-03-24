const webpack = require('webpack');
const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server');
const errorOverlayMiddleware = require('./errorOverlayMiddleware');
const clearConsole = require('./clearConsole');

const isInteractive = process.stdout.isTTY;
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8000;
const HOST = process.env.HOST || '0.0.0.0';
// const PROTOCOL = process.env.HTTPS ? 'https' : 'http';

process.env.NODE_ENV = 'development';

function dev({
  webpackConfig,
  contentBase,
  proxy,
  port = DEFAULT_PORT,
  _beforeServerWithApp,
  beforeMiddlewares,
  afterMiddlewares,
  beforeServer,
  afterServer,
  serverConfig: serverConfigFromOpts = {},
}){

  // if(!port || !DEFAULT_PORT){
  //   return;
  // }
  
  const serverConfig = {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    progress: true,
    hot: true,
    quiet: false,
    stats: { colors: true },
    headers: {
      'access-control-allow-origin': '*',
    },
    publicPath: webpackConfig.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/,
    },
    historyApiFallback: false,
    overlay: false,
    host: HOST,
    proxy,
    https: !!process.env.HTTPS,
    // cert: CERT,
    // key: KEY,
    contentBase: contentBase || process.env.CONTENT_BASE,
    before(app) {
      (beforeMiddlewares || []).forEach(middleware => {
        app.use(middleware);
      });
      // internal usage for proxy
      if (_beforeServerWithApp) {
        _beforeServerWithApp(app);
      }
      app.use(errorOverlayMiddleware());
    },
    after(app) {
      (afterMiddlewares || []).forEach(middleware => {
        app.use(middleware);
      });
    },
    ...serverConfigFromOpts,
    ...(webpackConfig.devServer || {}),
  };

  WebpackDevServer.addDevServerEntrypoints(webpackConfig, serverConfig);
  const compiler = webpack(webpackConfig);
  const server = new WebpackDevServer(compiler, serverConfig);

  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      server.close(() => {
        process.exit(0);
      });
    });
  });


  if (beforeServer) {
    beforeServer(server);
  }

  server.listen(port, HOST, err => {
    if (err) {
      console.log(err);
      return;
    }
    if (isInteractive) {
      clearConsole();
    }
    console.log(chalk.cyan(`\n Starting the development server on \n http://localhost:${port}\n`));
    // send({ type: STARTING });
    if (afterServer) {
      afterServer(server);
    }
  });
}

module.exports = dev;