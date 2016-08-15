
'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    root: rootPath,
    db: "mongodb://localhost/session-auth",
    app: {
      name: "nodejs-angular-session"
    }
  },
  test: {},
  production: {}
};
