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
            numstrings : "@",
            displayfretnums : "@",
            fretinfo : "="
        },
        link: function (scope, element, attrs) {

            if (typeof scope.displayfretnums === 'undefined')
                scope.displayfretnums = true;

            scope.displayFretmarker = function (i,j) {
                return (i === 2 && _.contains([2,4,6,8], j)) ||
                    (_.contains([1,3], i) && j === 11);
            };

            scope.getInterval = function (i,j) {
                var val = scope.fretinfo["fret_" + i + "_" + j];
                var ret_val, res;
                if (val) {
                    if (val.interval.length === 2) {
                        // wtf?
                        res = val.interval[0] === 'b' ? '\u266d' : val.interval[0];
                        res = val.interval[0] === '#' ? '\u266f' : res
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

            scope.displayFret = function (i,j) {
                var val = scope.fretinfo["fret_" + i + "_" + j];
                if (val) {
                    return true;
                }
                else {
                    return false;
                }
            };

        }
    };
});
