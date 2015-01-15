The canonical location of this project is now [Xalior/gulp-preload-image](https://github.com/Xalior/gulp-preload-image).

gulp-preload-image is a Gulp extension to add a image preloading to a project, via HTML, Javascript or CSS3 file(s) in the pipeline. [Gulp is a streaming build system](https://github.com/gulpjs/gulp) utilizing [node.js](http://nodejs.org/).

```javascript
var preload = require('gulp-preload-image');
```

## API

### preload(destination, options)

#### destination

Type: `String`  
Default: `''`  

Output file to write preload directives to. The way to preload the images is defined by where the preloader outputs to. Valid filetypes are currently, only, '.css' - '.js' and '.html' will follow.
 
If no destination if specifically provided the image will *NOT* be preloaded but the gulp-pipeline will continue anyway - this is in an attempt to try and deter accidental/overly slow preloading.

#### options

Type: `Object`  
Default: `{
  'position': 'end'
}`  

Override the default options, these can be:

  position: ['start' | 'end']
  append  : [true | false]

## Usage

```javascript
var preload = require('gulp-preload-image');

// Copy all static images
gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(preload('build/style/appStyles.css', {'position': 'end', 'append': true}))
    .pipe(gulp.dest('build/img'));
});
```
