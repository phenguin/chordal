'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var myAppServices = angular.module('myApp.services', []);

myAppServices.value('version', '0.1');

myAppServices.factory('Music', function () {
    var notes = [
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
        { value : 'Ab', text : 'A\u266d' }
    ];

    var chordTypes = [
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

    return { notes : notes, chordTypes : chordTypes };
}).
    factory('Api', function ($http) {

    var res = {};
    var domain = "http://localhost:8080";

    res.chordsFromUrlPromise = function (url, tuning, low, high) {
        var params = {
            url : url,
            tuning : tuning,
            lowRange : low,
            highRange : high
        };

        var promise = $http({ url : domain + '/api/chords_from_url',
              method : 'GET',
              params : params
        });

        promise._resolved = false;

        return promise.then(function (response) {
            var res = [];
            console.log(response.data);

            _.each(response.data, function (x) {
                res.push({
                    name : x[0],
                    fret_info : x[1]
                });
            });

            res._resolved = true;
            return res;
        });

    };
    res.voicingPromise = function (note, chordType, tuning, lowRange, highRange) {
        var params = {
            note : note,
            chordType : chordType,
            tuning : tuning,
            lowRange : lowRange,
            highRange : highRange
        };

        var promise = $http({ url : domain + '/api/voicing_in_range',
              method : 'GET',
              params : params
        });

        promise._resolved = false;

        return promise.then(function (response) {
            var res = response.data;
            res._resolved = true;
            return res;
        });

    };

    res.parsedChordsVLPromise = function (query, tuning, low, high) {
        var params = {
            queryString : query,
            tuning : tuning,
            lowRange : low,
            highRange : high
        };

        var promise = $http({ url : domain + '/api/parse_chords_with_voice_leading',
              method : 'GET',
              params : params
        });

        promise._resolved = false;
        return promise.then(function (response) {

            var chordNames;
            var data = response.data;

            chordNames = query.replace(/\s+/, ' ').split(' ');

            _.each(_.range(data.length), function (i) {
                data[i].chordName = chordNames[i];
            });

            console.log("VL");
            console.log(data);
            data._resolved = true;
            return data;

        });


    };

    res.parsedChordsPromise = function (query, tuning, low, high) {
        var params = {
            queryString : query,
            tuning : tuning,
            lowRange : low,
            highRange : high
        };

        var promise = $http({ url : domain + '/api/parse_chord',
              method : 'GET',
              params : params
        })

        promise._resolved = false;

        return promise.then(function (response) {
            var chordNames;
            var data = response.data;

            chordNames = query.replace(/\s+/, ' ').split(' ');

            _.each(_.range(data.length), function (i) {
                data[i].chordName = chordNames[i];
            });

            console.log("No VL");
            console.log(data);
            data._resolved = true;
            return data;

        });

    };
    return res;

});


