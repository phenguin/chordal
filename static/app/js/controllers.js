'use strict';

/* Controllers */
angular.module('myApp.controllers', []).
    controller('FretboardCtrl', ['$scope', '$http', 'Music', 'Api','$routeParams', function($scope, $http, Music, Api, $routeParams) {
    var encodedurl=$routeParams.encodedurl;
    var url;
    console.log(encodedurl);
    console.log($scope.url);

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

    if (encodedurl) {
        url = atob(encodedurl);

        $scope.active_chords = Api.chordsFromUrlPromise(url, $scope.tuning, $scope.lowRange, $scope.highRange);
        
        console.log("Active chords:");
        console.log($scope.active_chords);
    }

    $scope.setCurrentChord = function (chord) {
        $scope.current_chord = chord;
    }

    $scope.clearChords = function () {
        $scope.active_chords = [];
        $scope.current_chord = {};
    }


}]);
