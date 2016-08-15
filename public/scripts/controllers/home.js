'use strict';

angular.module('nodejsAngularSession')
  .controller('HomeController', ['$scope', '$csrf', function ($scope, $csrf) {

    var username;
    $scope.tokenValue = $csrf;

    if ($scope.user.local) {
      username = $scope.user.local.email;
    }
    $scope.greeting = 'Hello ' + username + '!';
  }]);
