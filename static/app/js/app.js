'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/fretboard', {templateUrl: 'partials/fretboard.html', controller: 'FretboardCtrl'});
    $routeProvider.otherwise({redirectTo: '/fretboard'});
  }]);
