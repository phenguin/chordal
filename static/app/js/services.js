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
});


