/* jshint node: true */
/* global describe, it, beforeEach */
'use strict';

var preload = require('../');
var should = require('should');
var gutil = require('gulp-util');
require('mocha');

describe('preload', function () {
    var fakeFile;

    function getFakeFile(fileContent) {
        return new gutil.File({
            path: './test/fixture/fakefile.img',
            cwd: './test/',
            base: './test/fixture/',
            contents: new Buffer(fileContent || '')
        });
    }

    beforeEach(function () {
        fakeFile = getFakeFile('FAKEIMAGEDATA.BIN');
    });

    describe('basics', function () {
        it('file should pass through, no matter what...', function (done) {
            var file_count = 0;
            var stream = preload();
            stream.on('data', function (newFile) {
                should.exist(newFile);
                should.exist(newFile.path);
                should.exist(newFile.relative);
                should.exist(newFile.contents);
                newFile.path.should.equal('./test/fixture/fakefile.img');
                newFile.relative.should.equal('fakefile.img');
                newFile.contents.toString().should.equal('FAKEIMAGEDATA.BIN');
                ++file_count;
            });

            stream.once('end', function () {
                file_count.should.equal(1);
                done();
            });

            stream.write(fakeFile);
            stream.end();
        });


    });

});
