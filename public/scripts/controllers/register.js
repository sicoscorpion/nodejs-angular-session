'use strict';

angular.module('nodejsAngularSession')
.controller('RegisterController', ['$scope', '$http', '$state', '$csrf', function ($scope, $http, $state, $csrf) {
  init();
  $scope.tokenValue = $csrf;

  $scope.signup = function () {
    $http
    .post('/signup', $scope.signupData)
    .success(function (data, status, headers, config) {
      $state.go('user.home');
    })
    .error(function (data, status, headers, config) {
      $scope.signupForm.serverError = {
        message : 'Error: Attempt failed'
      };
      if (data.message) {
        $scope.signupForm.serverError.message = data.message;
      }
    });
  };

  function init() {
    $scope.signupData = {};
  }
}]);
