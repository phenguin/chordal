'use strict';

/* Directives */


angular.module('myApp.directives', ['myApp.filters']).
    directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
        elm.text(version);
    };
}]).
    directive('fretboard', function () {
    return {
        restrict: "E",
        templateUrl: "static/templates/fretboard.html",
        scope : {
            numfrets : "@",
            numstrings : "@"
        },
        link: function (scope, element, attrs) {
            console.log(scope);
            console.log(attrs);
        }
    };
});
