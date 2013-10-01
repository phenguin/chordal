'use strict';

/* Controllers */
angular.module('myApp.controllers', []).
  controller('FretboardCtrl', ['$scope', '$http', function($scope, $http) {
    var domain = "http://localhost:8080";
    $scope.test = "Testval";
    $scope.notes = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
    $scope.note = $scope.notes[0];
    $scope.chordTypes = [
        { value : 'majorTriad', text : 'Major Triad' },
        { value : 'minorTriad', text : 'Minor Triad' },
        { value : 'augTriad', text : 'Augmented Triad' },
        { value : 'dimTriad', text : 'Diminished Triad' },
        { value : 'maj7chord', text : 'Major 7th Chord' },
        { value : 'min7chord', text : 'Minor 7th Chord' },
        { value : 'dom7chord', text : 'Dominant 7th Chord' },
        { value : 'halfdim7chord', text : 'Half Diminished Chord' },
        { value : 'fulldim7chord', text : 'Fully Diminished Chord' }
    ];
    $scope.chordType = $scope.chordTypes[0].value;
    $scope.tunings = ['standardTuning'];
    $scope.tuning = $scope.tunings[0];

    $scope.response = {};

    $scope.updateFretboard = function  () {
        var params = { note : $scope.note,
            chordType : $scope.chordType,
            tuning : $scope.tuning };

        $http({ url : domain + '/api/chord_notes',
              method : 'GET',
              params : params
        }).success(function (data) {
            $scope.response = data;
        });

    };

    $scope.displayFretmarker = function (i,j) {
        return (i === 2 && _.contains([2,4,6,8], j)) ||
            (_.contains([1,3], i) && j === 11);
    };

    $scope.displayFret = function (i,j) {
        var val = $scope.response["fret_" + i + "_" + j];
        if (val) {
            return true;
        }
        else {
            return false;
        }
    };

    $scope.getInterval = function (i,j) {
        var val = $scope.response["fret_" + i + "_" + j];
        if (val) {
            return val.interval;
        }
        else {
            return false;
        }
    };
  }]);
