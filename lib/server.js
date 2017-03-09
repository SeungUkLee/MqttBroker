var mosca = require('mosca');
var authorizer = require('./authorizer');

function app(settings) {
  var server = new mosca.Server(settings, done);
  function done() {}

  console.log('server.js ready');
  server.on('ready', setup);

  function setup() {
    server.authenticate = authorizer.authenticate;
    server.authorizePublish = authorizer.authorizePublish;
    server.authorizeSubscribe = authorizer.authorizeSubscribe;
  }

  return server;
}

module.exports.start = app;
