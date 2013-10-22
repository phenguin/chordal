'use strict';

/* Controllers */
angular.module('myApp.controllers', []).
    controller('FretboardCtrl', ['$scope', '$http', 'Music', function($scope, $http, Music) {
    var domain = "http://localhost:8080";
    $scope.test = "Testval";

    $scope.notes = Music.notes;
    $scope.chordTypes = Music.chordTypes;

    $scope.note = $scope.notes[0].value;

    $scope.chordType = $scope.chordTypes[0].value;
    $scope.lowRange = 0;
    $scope.highRange = 4;
    $scope.tunings = ['standardTuning'];
    $scope.tuning = $scope.tunings[0];

    $scope.active_chords = [];
    $scope.current_chord = {};
    $scope.response = {};

    $scope.getVoicing = function () {
        var params = {
            note : $scope.note,
            chordType : $scope.chordType,
            tuning : $scope.tuning,
            lowRange : $scope.lowRange,
            highRange : $scope.highRange
        };

        $http({ url : domain + '/api/voicing_in_range',
              method : 'GET',
              params : params
        }).success(function (data) {
            $scope.response = data;
            $scope.current_chord = data;
        });

    };

    $scope.updateRangeAndQuery = function (startFret) {
        $scope.lowRange = startFret;
        $scope.highRange = startFret + 4;
        $scope.parseChords();
     
    };

    $scope.parseChords = function () {
        var params = {
            queryString : $scope.chordString,
            tuning : $scope.tuning,
            lowRange : $scope.lowRange,
            highRange : $scope.highRange
        };

        $http({ url : domain + '/api/parse_chords_with_voice_leading',
              method : 'GET',
              params : params
        }).success(function (data) {
            var chordNames;

            chordNames = $scope.chordString.replace(/\s+/, ' ').split(' ');

            _.each(_.range($scope.active_chords.length), function (i) {
                data[i].chordName = chordNames[i];
            });

            $scope.active_chords = data;

            console.log($scope.active_chords);

            $scope.current_chord = $scope.active_chords[0];
        });

    };

    $scope.setCurrentChord = function (chord) {
        $scope.current_chord = chord;
    }

    $scope.clearChords = function () {
        $scope.active_chords = [];
        $scope.current_chord = {};
    }

    $scope.parseChordsAndAdd = function () {
        var params = {
            queryString : $scope.chordString,
            tuning : $scope.tuning,
            lowRange : $scope.lowRange,
            highRange : $scope.highRange
        };

        $http({ url : domain + '/api/parse_chord',
              method : 'GET',
              params : params
        }).success(function (data) {
            var chordNames;

            chordNames = $scope.chordString.replace(/\s+/, ' ').split(' ');

            _.each(_.range(data.length), function (i) {
                data[i].chordName = chordNames[i];
            });

            console.log(data);

            $scope.active_chords = $scope.active_chords.concat(data);
            $scope.current_chord = data[data.length - 1];
        });

    };
    $scope.updateFretboard = function  () {
        var params = { note : $scope.note,
            chordType : $scope.chordType,
            tuning : $scope.tuning };

            $http({ url : domain + '/api/chord_notes',
                  method : 'GET',
                  params : params
            }).success(function (data) {
                $scope.current_chord = data;
            });

    };

    $scope.displayFretmarker = function (i,j) {
        return (i === 2 && _.contains([2,4,6,8], j)) ||
            (_.contains([1,3], i) && j === 11);
    };

    $scope.displayFret = function (i,j) {
        var val = $scope.current_chord["fret_" + i + "_" + j];
        if (val) {
            return true;
        }
        else {
            return false;
        }
    };

    $scope.getInterval = function (i,j) {
        var val = $scope.current_chord["fret_" + i + "_" + j];
        if (val) {
            var ret_val;
            if (val.interval.length === 2) {
                var res = val.interval[0] === 'b' ? '\u266d' : val.interval[0];
                var res = val.interval[0] === '#' ? '\u266f' : val.interval[0];
                ret_val = res + val.interval[val.interval.length - 1];
            } else if (val.interval === '1') {
                ret_val = 'R';
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
