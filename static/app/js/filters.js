'use strict';

/* Filters */

angular.module('myApp.filters', []).
    filter('interpolate', ['version', function(version) {
    return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    };
}]).filter('makeRange', function() {
    return function(input) {
        var lowBound, highBound;
        switch (input.length) {
            case 1:
                lowBound = 0;
            highBound = parseInt(input[0]) - 1;
            break;
            case 2:
                lowBound = parseInt(input[0]);
            highBound = parseInt(input[1]);
            break;
            default:
                return input;
        }
        var result = [];
        for (var i = lowBound; i <= highBound; i++)
        result.push(i);
        return result;
    };
}).
    filter('reverse', function () {
    return function (input) {
        return input.reverse();
    };
}).
    filter('every', function () {
    return function (inputlist, n, offset) {
        var res = [];

        if (typeof inputlist !== 'object' || !inputlist.hasOwnProperty('length'))
            return inputlist;

        for (var i=0; i < inputlist.length; i++) {
            if (i % n === offset)
                res.push(inputlist[i]);
        }
        return res;

    };
});

