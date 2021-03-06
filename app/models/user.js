
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({

  local: {
    username: String,
    email: String,
    password: String,
  },

  ldap: {
    username: String,
    email: String,
    uid: String
  }

});

// Add toJSON option to transform document before returnig the result
UserSchema.options.toJSON = {
  transform: function (doc, ret, options) {

    // rewmove sensitive data
    if (ret.local && ret.local.password) {
      delete ret.local.password;
    }
    if (ret.facebook && ret.facebook.accessToken) {
      delete ret.facebook.accessToken;
    }

    // add id feild and remove _id and __v
    ret.id = ret._id;

    delete ret._id;
    delete ret.__v;
  }
};


// Pre-save hook for password validation and hashing
UserSchema.pre('save', function(next){
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('local.password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.local.password, salt, function(err, hash) {
      if (err) return next(err);
      user.local.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt
  .compare(candidatePassword, this.local.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
