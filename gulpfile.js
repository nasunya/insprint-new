'use strict';
var gulp = require('gulp');
var
    util = require('gulp-util'),
    svgSprite = require('gulp-svg-sprites'),
    size = require('gulp-size'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    notify = require('gulp-notify'),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    twig = require('gulp-twig'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    imagemin = require('gulp-imagemin'),
    svgo = require('gulp-svgo'),
    rsp = require('remove-svg-properties').stream;

var sourcesPath = './sources';
var assetsPath = './assets';

// Browser Sync
var config = {
    server: {
        baseDir: "./"
    },
    tunnel: false,
    host: 'localhost',
    port: 8003,
    logPrefix: "local"
};
gulp.task('webserver', function () {
    browserSync(config);
});
gulp.task('sass', function () {
    return gulp.src(sourcesPath + '/sass/main.scss')
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 15 versions'))
        .pipe(gulp.dest(assetsPath + '/css'))
        .pipe(reload({
            stream: true
        }));
});
gulp.task('js-lib', function () {
    return gulp.src(sourcesPath + '/js/vendors/*.js')
        .pipe(plumber())
        .pipe(concat(assetsPath + '/js/main.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./'))
        .pipe(notify('Complete!'))
        .pipe(reload({
            stream: true
        }));
});
gulp.task('js', function () {
    return gulp.src(sourcesPath + '/js/app.js')
        .pipe(plumber())
        // .pipe(uglify())
        .pipe(gulp.dest(assetsPath + '/js/'))
        .pipe(notify('Complete!'))
        .pipe(reload({
            stream: true
        }));
});
gulp.task('compile', function () {
    'use strict';
    return gulp.src('./sources/twig/**/*.twig')
        .pipe(twig({
            data: {
                title: 'Orionterm'
            },
            base: ['./sources/twig/*.twig']
        }))
        .on('error', notify)
        .pipe(rename({
            extname: '.html'
        }))
        .pipe(gulp.dest('./'))
        .pipe(reload({
            stream: true
        }));
});
gulp.task('image:build', function () {
    gulp.src(sourcesPath + '/img/**/*')
        .pipe(gulp.dest(assetsPath + '/img/'))
});

gulp.task('fonts:build', function () {
    gulp.src(sourcesPath + '/fonts/**/*')
        .pipe(gulp.dest(assetsPath + '/fonts/'))
});
gulp.task('watch', function () {
    watch(sourcesPath + '/sass/**/*.scss', function (event, cb) {
        gulp.start('sass');
    });
    watch(sourcesPath + '/js/vendors/*.js', function (event, cb) {
        gulp.start('js-lib');
    });
    watch(sourcesPath + '/js/*.js', function (event, cb) {
        gulp.start('js');
    });
    watch(sourcesPath + '/twig/**/*.twig', function (event, cb) {
        gulp.start('compile');
    });
    watch(sourcesPath + '/img/**/*', function (event, cb) {
        gulp.start('image:build');
    });
    watch(sourcesPath + '/fonts/**/*', function (event, cb) {
        gulp.start('fonts:build');
    });
});
// Default task
gulp.task('default', ['compile', 'webserver', 'watch']);