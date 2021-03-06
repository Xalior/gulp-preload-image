/* jshint node: true */
/* global describe, it, beforeEach */
'use strict';

var preload = require('../'),
    should = require('should'),
    gutil = require('gulp-util'),
    tmp = require('tmp'),
    fs = require('fs');

require('mocha');

tmp.setGracefulCleanup();

var _tmp;

describe('gulp-preload-image', function () {
    function getFakeFile(filePath, fileContent, fileCwd, fileBase) {
        return new gutil.File({
            path: (filePath || './test/fixtures/fakefile.img'),
            contents: new Buffer(fileContent || 'FAKEIMAGEDATA.BIN'),
            cwd: (fileCwd || './test/'),
            base: (fileBase, './test/fixtures/')
        });
    }

    describe('form', function () {
        it('should throw, when arguments is missing', function () {
            (function () {
                preload();
            }).should.throw('Missing destination option for gulp-preload-image');
        });

        it('should pass though a single file', function (done) {
            var file_count = 0;
            tmp.tmpName({ template: './test/tmp/gulp-preload-image-test-XXXXXX' }, function _tempNameGenerated(err, path) {
                var stream = preload(path);
                stream.on('data', function (newFile) {
                    should.exist(newFile);
                    should.exist(newFile.path);
                    should.exist(newFile.relative);
                    should.exist(newFile.contents);
                    newFile.path.should.equal('./test/fixtures/fakefile.img');
                    newFile.relative.should.equal('fakefile.img');
                    newFile.contents.toString().should.equal('FAKEIMAGEDATA.BIN');
                    ++file_count;
                });

                stream.once('end', function () {
                    file_count.should.equal(1);
                    done();
                    fs.unlinkSync(path);
                });

                stream.write(getFakeFile());
                stream.end();
            });
        });

        it('should pass though multiple files', function (done) {
            var file_count = 0;
            tmp.tmpName({ template: './test/tmp/gulp-preload-image-test-XXXXXX' }, function _tempNameGenerated(err, path) {
                var stream = preload(path);

                stream.on('data', function () {
                    ++file_count;
                });

                stream.on('end', function () {
                    file_count.should.equal(2);
                    done();
                    fs.unlinkSync(path);
                });

                stream.write(getFakeFile());
                stream.write(getFakeFile('./test/fixtures/fakefile2.img'));
                stream.end();
            });
        });
    });

    describe('function', function () {
        it('should create a CSS file', function (done) {
            tmp.tmpName({ template: './test/tmp/gulp-preload-image-test-XXXXXX' }, function _tempNameGenerated(err, path) {
                if (err) throw err;

                var stream = preload(path);
                stream.on('end', function () {
                    fs.existsSync(path).should.equal(true);
                    done();
                    fs.unlinkSync(path);
                });

                stream.write(getFakeFile('./test/fixtures/image.png'));
                stream.end();
            });
        });
        
        it('should create ONLY one CSS file', function (done) {
            tmp.tmpName({ template: './test/tmp/gulp-preload-image-test-XXXXXX' }, function _tempNameGenerated(err, path) {
                if (err) throw err;

                var stream = preload(path);
                stream.on('end', function () {
                    fs.existsSync(path).should.equal(true);
                    done();
                    fs.unlinkSync(path);
                });

                stream.write(getFakeFile());
                stream.end();
            });
        });
        it('should eject multiple source folders for one CSS file', function (done) {
            tmp.tmpName({ template: './test/tmp/gulp-preload-image-test-XXXXXX' }, function _tempNameGenerated(err, path) {
                if (err) throw err;

                var stream = preload(path);
                _tmp = path;
                stream.on('end', function () {
                    fs.readFileSync(path).toString().should.match("body:after { content: url(my/gargantuan/image.png) url(../my/other/image.png); display: none;}");
                    done();
                });

                stream.write(getFakeFile('./test/tmp/my/gargantuan/image.png'));
                stream.write(getFakeFile('./test/my/other/image.png'));
                stream.end();
            });
        });

        it('should append to CSS if told', function (done) {

            var stream = preload(_tmp, {append: true});
            stream.on('end', function () {
                fs.readFileSync(_tmp).toString().should.match("body:after { content: url(my/gargantuan/image.png) url(../my/other/image.png); display: none;}body:after { content: url(../fake/image.png); display: none;}");
                done();
                fs.unlinkSync(_tmp);
            });

            stream.write(getFakeFile('./test/fake/image.png'));
            stream.end();
        });
    });

});
