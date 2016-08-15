
'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function (passport, config) {

  // serialize user into session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deseriallize user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Local Strategy
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },

  function (email, password, done) {
    User.
    findOne({ 'local.email': email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Unknown email' });
      }
      user.comparePassword(password, function (err, isMatch) {
        if (err) { return done(err); }
        if(!isMatch) {
          return done(null, false, { message: 'Invalid password.' });
        }
        return done(null, user);
      });
    });
  }));

};
