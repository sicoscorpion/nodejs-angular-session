
'use strict';

var passport = require('passport');
var LdapStrategy = require('passport-ldapauth');
var User = require('../models/user');


function signin(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res.send(401).send({ success: false, message: info.message });
    }
    // if user, Log in
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send(user.toJSON());
    });
  })(req, res, next);
}

function signup(req, res, next) {

  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  // validate email and password
  if(!email || !email.length) {
    return res.send(400).send({ message: 'email is not valid' });
  }
  if(!password || !password.length) {
    return res.send(400).send({ message: 'password is not valid' });
  }

  User.findOne({ 'local.email': email }, function (err, user) {
    if (err) { return next(err); }

    // check if user is already exists
    if (user) {
      return res.send(409).send({ message: 'the email is already taken.' });
    }

    // create and save a new user
    user = new User();
    user.local.email = email;
    user.local.password = password;
    user.local.username = username;

    user.save(function (err, user) {
      if (err) { return next(err); }

      // login after user is registered and saved
      req.logIn(user, function (err) {
        return res.send(user.toJSON());
      });
    });
  });
}

// signin using ldap-strategy
function ldapSignin(req, res, next) {
  passport.authenticate('ldapauth', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res.send(401).send({ success: false, message: 'authentication failed!' });
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send(user.toJSON());
    });
  })(req, res, next);
}

function signout(req, res) {
  req.logout();
  res.status(200).send({success: true, message: "siginout successfull"});
}

function checkSignin(req, res) {
  res.send(req.isAuthenticated() ? req.user.toJSON() : 'Not Authenticated');
}


// public functions and variables
exports.signin = signin;
exports.ldapSignin = ldapSignin;
exports.signup = signup;
exports.signout = signout;
exports.checkSignin = checkSignin;