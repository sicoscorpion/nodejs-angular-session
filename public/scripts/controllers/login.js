'use strict';

angular.module('nodejsAngularSession')
.controller('LoginController', ['$scope', '$http', '$state', '$csrf', function ($scope, $http, $state, $csrf) {
  init();

  $scope.tokenValue = $csrf;
  $scope.signin = function () {
    $http
    .post('/signin', $scope.signinData)
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

  function init() {
    $scope.signinData = {};
  }
}]);
