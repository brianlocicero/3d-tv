/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */
 
// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del');
 
// css
gulp.task('css', function() {
  return gulp.src(['css/main.css', 'css/animate.css'])
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'css task complete' }));
});
 
// JS
gulp.task('js', function() {
  return gulp.src(['bower_components/three.js/three.js', 'bower_components/jquery/dist/jquery.js', 'bower_components/tweenjs/src/Tween.js', 'js/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'JS task complete' }));
});
 
// Images
gulp.task('images', function() {
  return gulp.src('images/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

//HTML
gulp.task('html', function() {
  return gulp.src('*.html')
  .pipe(gulp.dest('dist'));
});

//VIDEOS
gulp.task('videos', function() {
  return gulp.src('videos/*.mp4')
  .pipe(gulp.dest('dist/videos'));
});

// Clean
gulp.task('clean', function(cb) {
    del(['dist/css', 'dist/js', 'dist/images', 'dist/videos'], cb)
});
 
// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('css', 'js', 'images', 'videos');
});