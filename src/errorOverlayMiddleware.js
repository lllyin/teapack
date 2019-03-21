
const launchEditor =  require('react-dev-utils/launchEditor');
const launchEditorEndpoint = require('react-dev-utils/launchEditorEndpoint');

module.exports = function createLaunchEditorMiddleware() {
  return function launchEditorMiddleware(req, res, next) {
    if (req.url.startsWith(launchEditorEndpoint)) {
      launchEditor(req.query.fileName, req.query.lineNumber);
      res.end();
    } else {
      next();
    }
  };
}