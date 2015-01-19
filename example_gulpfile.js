var gulp = require('gulp'), 
    preload = require('./');

var paths = {
    images: [
        '!test/fixtures/images/**/*.jpeg',
        '!test/fixtures/images/NotMe.gif',
        'test/fixtures/images/**/*.jpg',
        'test/fixtures/images/**/*.png',
        'test/fixtures/images/**/*.gif'
    ]
};

gulp.task('images', function() {
    return gulp.src(paths.images)
        // Pass in output path to the task
        .pipe(preload('./example_gulpfile.css', { append: false }))
});

gulp.task('default', ['images']);
