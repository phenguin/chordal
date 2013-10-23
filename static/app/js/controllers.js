'use strict';

/* Controllers */
angular.module('myApp.controllers', []).
    controller('FretboardCtrl', ['$scope', 'Music', 'Api', function($scope, Music, Api ) {

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

    $scope.setCurrentChord = function (chord) {
        $scope.current_chord = chord;
    };

    $scope.clearChords = function () {
        $scope.active_chords = [];
        $scope.current_chord = {};
    };


}]).
    controller('UrlChordsCtrl', ['$scope', 'Music', 'Api','$routeParams', function($scope, Music, Api, $routeParams) {

    var encodedurl=$routeParams.encodedurl;
    var url;
    console.log(encodedurl);
    console.log($scope.url);

    if (encodedurl) {
        url = atob(encodedurl);
        console.log("Chords scraped from page: " + url);

        $scope.active_chords = Api.chordsFromUrlPromise(url, $scope.tuning, $scope.lowRange, $scope.highRange);

        console.log("Active chords:");
        console.log($scope.active_chords);
    }

}]);
