'use strict';

angular.module('nodejsAngularSession')
.factory('Auth', ['$http', function ($http) {
  return {
    signout: function (success, error) {
      $http.post('/signout').success(success).error(error);
    }
  };
}])
.factory('Users', ['$http', function ($http) {
  return {
    list: function (success, error) {
      $http.get('/api/users').success(success).error(error);
    }
  };
}])
// get the XSRF-TOKEN from cookie
.factory('$csrf', function () {
  var cookies = document.cookie.split('; ');
  for (var i=0; i<cookies.length; i++) {
    var cookie = cookies[i].split('=');
    if(cookie[0].indexOf('XSRF-TOKEN') > -1) {
      return cookie[1];
    }
  }
  return 'none';
});