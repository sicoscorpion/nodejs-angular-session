'use strict';

angular.module('nodejsAngularSession')
.controller('LoginController', ['$scope', '$http', '$state', '$csrf', function ($scope, $http, $state, $csrf) {
  init();

  $scope.tokenValue = $csrf;
  $scope.signin = function (method) {
    $http
    .post('/'+method, $scope.signinData)
    .success(function (data, status, headers, config) {
      $state.go('user.home');
    })
    .error(function (data, status, headers, config) {
      $scope.loginForm.serverError = {
        message : 'Error: Attempt failed'
      };
      if (data.message) {
        $scope.loginForm.serverError.message = data.message;
      }
    });
  };

  $scope.tabs = [{
    slug: 'signin',
    title: "Local SignIn",
    content: "Your Dashboard"
  }, {
    slug: 'ldapsignin',
    title: "LDAP SignIn",
    content: "Dynamic content 1"
  }];

  $scope.onTabSelected = function(tab) {
    var route;
    if (typeof tab === 'string') {
      switch (tab) {
        case 'signin':
          route = tab;
          break;
        default:
          route = 'ldapsignin';
          break;
      }
    }
  };

  function init() {
    $scope.signinData = {};
  }
}]);
