'use strict';

/* Controllers */
angular.module('myApp.controllers', []).
  controller('FretboardCtrl', ['$scope', '$http', function($scope, $http) {
    var domain = "http://localhost:8080";
    $scope.test = "Testval";

    $scope.notes = [
        { value : 'A', text : 'A' },
        { value : 'Bb', text : 'B\u266d' },
        { value : 'C', text : 'C' },
        { value : 'Db', text : 'D\u266d' },
        { value : 'D', text : 'D' },
        { value : 'Eb', text : 'E\u266d' },
        { value : 'E', text : 'E' },
        { value : 'F', text : 'F' },
        { value : 'Gb', text : 'G\u266d' },
        { value : 'G', text : 'G' },
        { value : 'Ab', text : 'A\u266d' },
    ];

    $scope.note = $scope.notes[0].value;

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
            var ret_val;
            if (val.interval.length === 2) {
                var res = val.interval[0] === 'b' ? '\u266d' : val.interval[0];
                ret_val = res + val.interval[val.interval.length - 1];
            } else {
                ret_val = val.interval;
            }
            return ret_val;
        }
        else {
            return false;
        }
    };
  }]);
