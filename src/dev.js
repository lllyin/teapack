const webpack = require('webpack');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
const openBrowser = require('react-dev-utils/openBrowser');
const {
  choosePort,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const clearConsole = require('react-dev-utils/clearConsole');

const errorOverlayMiddleware = require('./errorOverlayMiddleware');

const isInteractive = process.stdout.isTTY;
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8000;
const HOST = process.env.HOST || '0.0.0.0';
const PROTOCOL = process.env.HTTPS ? 'https' : 'http';

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
  process.env.NODE_ENV = 'development';

  const serverConfig = {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    progress: false,
    hot: true,
    quiet: true,
    stats: { colors: true},
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

  checkBrowsers(path.resolve(process.cwd(), '.'), isInteractive)
    .then(() => {
      // We attempt to use the default port but if it is busy, we offer the user to
      // run on a different port. `choosePort()` Promise resolves to the next free port.
      return choosePort(HOST, port);
    })
    .then(port => {
      const Urls = prepareUrls(PROTOCOL, HOST, port);

      process.env.Urls = JSON.stringify(Urls);
      process.env.PORT = port;
      server.listen(port, HOST, err => {
        if (err) {
          console.log(err);
          return;
        }
        if (isInteractive) {
          clearConsole();
        }
        // send({ type: STARTIN });
        if (afterServer) {
          afterServer(server);
        }
        openBrowser(Urls.localUrlForBrowser);
      });
    })
}

module.exports = dev;