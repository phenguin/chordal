'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('FretboardCtrl', ['$scope', '$http', function($scope, $http) {
    var domain = "http://localhost:8080";
    $scope.test = "Testval";
    $scope.notes = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
    $scope.note = $scope.notes[0];
    $scope.chordTypes = ['majorTriad'];
    $scope.chordType = $scope.chordTypes[0];
    $scope.tunings = ['standardTuning'];
    $scope.tuning = $scope.tunings[0];


    $scope.updateFretboard = function  () {
        var params = { note : $scope.note,
            chordType : $scope.chordType,
            tuning : $scope.tuning };

        $http({ url : domain + '/api/chord_notes',
              method : 'GET',
              params : params
        }).success(function (data) {
            console.log(data);
            $scope.response = data;
        });

    };

  }]);
