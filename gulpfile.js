'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');

var cssPattern ='./app/**/*.scss';

gulp.task('css', function(){
    return gulp.src(cssPattern)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'));
});
gulp.task('css:watch', function(){
    return gulp.watch(cssPattern, ['css'])
});

var entryPoint = './app/index.js';

gulp.task('default', function() {
    gulp.src(entryPoint)
        .pipe(babel())
        .pipe(gulp.dest('./public'))
});