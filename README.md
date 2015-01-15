The canonical location of this project is now [Xalior/gulp-preload-image](https://github.com/Xalior/gulp-preload-image).

gulp-preload-image is a Gulp extension to add a image preloading to a project, via HTML, Javascript or CSS3 file(s) in the pipeline. [Gulp is a streaming build system](https://github.com/gulpjs/gulp) utilizing [node.js](http://nodejs.org/).

```javascript
var preload = require('gulp-preload-image');
```

## API

### preload(method)

#### method

Type: `String`  
Default: `''`  

The way to preload the image. If no method if specifically provided the image will *NOT* be preloaded, in a mode to try and deter accidental/overly slow preloading.

## Usage

```javascript
var preload = require('gulp-preload-image');

gulp.src('./images/*.[png|gif|jpg]')
  .pipe(preload('css'))
  .pipe(gulp.dest('./css/styles.css')
```
