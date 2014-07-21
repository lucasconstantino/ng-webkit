/**
 * @file Gulp streams.
 */

var gulp = require('gulp')

// Load plugins.
var jshint = require('gulp-jshint')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')

// Scripts ordering.
var scripts = [
  'src/module.js',
  'src/services/nw-gui.js',
  'src/services/nw-window.js',
  'src/directives/window.js'
];

// Lint.
gulp.task('lint', function () {
  return gulp.src(scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
})

// Concatenate & Minify.
gulp.task('dist', function () {
  return gulp.src(scripts)
    .pipe(concat('ng-webkit.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('ng-webkit.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})

// Watch for changes.
gulp.task('watch', function () {
  gulp.watch(scripts, ['lint', 'dist'])
})

// Default task.
gulp.task('default', ['lint', 'dist', 'watch'])
