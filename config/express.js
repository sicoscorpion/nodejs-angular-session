
'use strict';

var express = require('express');
var cons = require('consolidate');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var session = require('express-session');
var csrf = require('csurf');

// var mongoStore = require('connect-mongo')(express); // mongodb session store
// var path = require('path');

module.exports = function (app, config, passport) {


    // set ups for view engine
    app.engine('html', cons.underscore);
    app.set('view engine', 'html');
    app.set('views', config.root + '/public/views');
    app.set('port', process.env.PORT || 3000);
    app.use(express.static(config.root + '/public'));
    app.use(logger('dev'));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({ extended: false , limit: '50mb'}));

    var helmet = require('helmet');
    var crossdomain = require('helmet-crossdomain');

    // app.use(helmet({
    //   frameguard: {
    //     action: 'deny'
    //   }
    // }));

    app.use(helmet.xssFilter())
    app.disable('x-powered-by');
    app.use(crossdomain());

    app.use(helmet.hsts({
      maxAge: 1234000,
      force: true
    }))

    // old session configs
    // app.use(session({
    //     secret : 'Sa7fToFGraIes6AJ',
    //     // name : 'sessionId',
    //     cookie: {
    //       httpOnly: true
    //     },
    //     resave: true,
    //     saveUninitialized: true
    //   })
    // );

    app.set('trust proxy', 1);
    // setup for cookie based session
    app.use(cookieSession({
        secret: "Sa7fToFGraIes6AJ",
        cookie: { maxAge: 60000 },
        httpOnly: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(csrf());
    app.use(function(req, res, next) {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        next();
    });
};