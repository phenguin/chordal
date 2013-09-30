'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('FretboardCtrl', ['$scope', function($scope) {
    $scope.test = "Testval";
    var domain = "http://localhost";

  }]);
