var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefix = require('gulp-autoprefixer');
var browserify = require('browserify');
var babel = require('gulp-babel');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('commonjs', function() {
  gulp.src('./src/sweetalert2.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename('sweetalert2.js'))
    .pipe(gulp.dest('dist'))
});

gulp.task('compress', function() {
  var b = browserify({
    debug: true,
    transform: [
      babelify.configure({presets: ['es2015']})
    ]
  })
  b.add('./src/sweetalert2.js');

  return b.bundle()
    .pipe(source('sweetalert2.min.js'))
    .pipe(gulp.dest('dist'))
});

gulp.task('sass', function() {
  gulp.src('src/sweetalert2.scss')
    .pipe(sass())
    .pipe(autoprefix())
    .pipe(gulp.dest('dist'));

  gulp.src('src/sweetalert2.scss')
    .pipe(sass())
    .pipe(autoprefix())
    .pipe(cleanCSS())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['compress']);
  gulp.watch('**/*.scss', ['sass']);
});
