/* jshint node: true */
'use strict';

var es = require('event-stream'),
    path = require('path'),
    gutil = require('gulp-util');

var preloadPlugin = function (destination, preloader) {
    preloader = preloader || '';

    return es.map(function (file, cb) {
        if (typeof(destination) != "undefined") {
            var _outputPath = path.resolve(destination);
            console.log(_outputPath);

            preloader = preloader + file.path;
            console.log('file.path: ' + file.path);
        }
        cb(null, file);
    });
};

module.exports = preloadPlugin;
