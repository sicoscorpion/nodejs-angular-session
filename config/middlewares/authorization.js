
'use strict';

// generic require signin middleware
exports.requiresSignin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    var info = {
      success: false,
      info: {message: "requires authentication"}
    };
    return res.status(401).send(info);
  }
  next();
};
