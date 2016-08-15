'use strict';

angular.module('nodejsAngularSession')
  .controller('HomeController', ['$scope', '$csrf', function ($scope, $csrf) {

    var username;
    $scope.tokenValue = $csrf;

    if ($scope.user.local) {
      username = $scope.user.local.username;
    }
    if ($scope.user.ldap) {
      username = $scope.user.ldap.username;
    }
    $scope.greeting = 'Hello ' + username + '!';
  }]);
