'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require("babelify");
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');


var cssPattern = './app/**/*.scss';

gulp.task('css', function () {
    return gulp.src(cssPattern)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());
});

var entryPoint = './app/index.js';

gulp.task('js', function () {
    browserify(
        entryPoint,
        {debug: true})
        .transform(babelify)
        .bundle()
        .on('error', function (err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public'))
        .pipe(livereload())
        .on('error', function (err) {
            throw err;
        });
});
var jadePattern = './views/*';
gulp.task('jade:watch', function(){
    return gulp.src(jadePattern)
    .pipe(livereload())
});
gulp.task('watch', function () {
    livereload.listen({
        quiet: false
    });
    gulp.watch(cssPattern, ['css']);
    gulp.watch('./app/**/*.js', ['js']);
    gulp.watch(jadePattern, ['jade:watch'])
});

gulp.task('nodemon', function () {
    nodemon({
        script: 'server.js',
        ignore: ['app', 'public', 'gulpfile.js', '.idea'],
        verbose: false,
        ext: 'js',
        execMap: {
            js: "node --harmony --use_strict"
        },
        env: {'NODE_ENV': 'development'}
    })
})

gulp.task('default', ['watch', 'nodemon'])