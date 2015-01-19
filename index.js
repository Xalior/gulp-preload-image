/* jshint node: true */
'use strict';

var es = require('event-stream'),
    path = require('path'),
    gutil = require('gulp-util'),
    fs = require('fs'),
    PluginError = gutil.PluginError;

var preloadPlugin = function (destination, opt) {
    if (!destination) {
        throw new PluginError('gulp-preload-image', 'Missing destination option for gulp-preload-image');
    }
    opt = opt || {};
    var _preloader = "body:after { content:";

    return es.through(function write(file) {
        _preloader = _preloader + ' url(' +
            path.relative(path.dirname(destination), file.path) +
        ')';

        this.emit('data', file)
    }, function end(){
        console.log(opt);
        _preloader = _preloader + "; display: none;}";
        if (opt.append) {
            fs.appendFileSync(destination, _preloader);
        } else {
            fs.writeFileSync(destination, _preloader);
        }
        this.emit('end');
    });
};

module.exports = preloadPlugin;
