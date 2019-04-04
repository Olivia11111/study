var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('concat', function() {
  return gulp.src('../javascript/Scripts/js/*.js')
    .pipe(concat('concat.js'))
    .pipe(gulp.dest('../javascript/dist/'));
});

gulp.task('sourcemaps', function() {
  return gulp.src('../javascript/Scripts/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('sourcemaps.js'))    
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('uglify', function() {
  return gulp.src('../javascript/Scripts/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('uglify.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});