
'use strict';

var passport = require('passport');
var auth = require('../config/middlewares/authorization');
var authCtrl = require('./controllers/auth');
var userCtrl = require('./controllers/user');

module.exports = function (app) {

  // secured restful api routes
  app.get('/api/users', auth.requiresSignin, userCtrl.list);


  // routes for sign in,  sigin up, and signout processes
  app.post('/signin', authCtrl.signin);
  app.post('/signup', authCtrl.signup);
  app.post('/signout', authCtrl.signout);

  // check if current user is signed in
  app.get('/signedin', authCtrl.checkSignin);

  // serve index.html for all other route
  app.all('/*', function (req, res) { res.render('index'); });
};
