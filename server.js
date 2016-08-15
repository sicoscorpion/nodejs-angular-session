
/**
 * server.js
 */

'use strict';

var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];
var app = express();
var server = http.createServer(app);

// db connection
mongoose.connect(config.db);

// passport config
require('./config/passport')(passport, config);

// express app config
require('./config/express')(app, config, passport);

// routes
require('./app/routes')(app);

module.exports = app;