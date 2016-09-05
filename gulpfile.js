'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    ngAnnotate = require('gulp-ng-annotate'),
    header = require('gulp-header'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-rimraf'),
    concat = require('gulp-concat-util'),
    pkg = require('./package.json'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),

    compass      = require('gulp-compass'),
    cleanCSS    = require('gulp-clean-css');

var today = new Date();

var config = {
    paths: {
        output: {
            minified: 'dist/minified/',
            unminified: 'dist/unminified/'
        }
    },
    scripts: 'src/',
    scss: 'src/scss/',
    banners: {
        unminified: '/*!\n' +
        ' * ' + pkg.prettyName + ' v' + pkg.version + '\n' +
        ' * ' + pkg.homepage + '\n' +
        ' *\n' +
        ' * Copyright (c) ' + (today.getFullYear()) + ' ' + pkg.author.name + '\n' +
        ' * License: ' + pkg.license + '\n' +
        ' *\n' +
        ' * Generated at ' + gutil.date(today, 'dddd, mmmm dS, yyyy, h:MM:ss TT') + '\n' +
        ' */',
        minified: '/*! ' + pkg.prettyName + ' v' + pkg.version + ' License: ' + pkg.license + ' */'
    }
};

// JavaScript
// =============

gulp.task('scripts', function () {
    return gulp.src([config.scripts + '**/*.js'])
        .pipe(concat('ng-arise.js', {
            separator: '\n\n',
            process: function (src) {
                // Remove all 'use strict'; from the code and
                // replaces all double blank lines with one
                return src.replace(/\r\n/g, '\n')
                    .replace(/'use strict';\n+/g, '')
                    .replace(/\n\n\s*\n/g, '\n\n');
            }
        }))
        .pipe(concat.header(config.banners.unminified + '\n' +
            '(function() {\n\'use strict\';\n\n'))
        .pipe(concat.footer('\n}());'))
        .pipe(gulp.dest(config.paths.output.unminified));
});

gulp.task('dist:js:clean', function () {
    return gulp.src([config.paths.output.minified], {read: false})
        .pipe(clean());
});

gulp.task('dist:js', ['dist:js:clean'], function () {
    return gulp.src(config.paths.output.unminified + 'ng-arise.js')
        .pipe(rename('ng-arise.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(header(config.banners.minified))
        .pipe(gulp.dest(config.paths.output.minified));
});

// SCSS/CSS
// =============

gulp.task('styles', function () {
    return gulp.src(config.scss + 'ng-arise.scss')
        .pipe(compass({
            sass: config.scss,
            css: config.paths.output.unminified,
            lineNumbers: false,
            errLogToConsole: true
        }))
        .pipe(gulp.dest(config.paths.output.unminified));
});

gulp.task('dist:css:clean', function () {
    return gulp.src([config.paths.output.minified + '**/*.css'], {read: false})
        .pipe(clean());
});

gulp.task('dist:css', ['dist:css:clean', 'styles'], function () {
    return gulp.src(config.paths.output.unminified + '*.css')
        .pipe(cleanCSS())
        .pipe(rename('ng-arise.min.css'))
        .pipe(gulp.dest(config.paths.output.minified));
});

// Watches
// =============
// Watches
gulp.task('watch', function () {
    gulp.watch(config.scss + '/**/*.scss', ['styles']);
    gulp.watch([config.scripts + '/**/*.js'], ['scripts']);
});

// User commands
// =============

// Code linter
gulp.task('lint', function () {
    return gulp.src([config.scripts + '**/*.js'])
        .pipe(jshint('.jshintrc', '.jshintignore'))
        .pipe(jshint.reporter(jshintStylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('default', ['lint', 'scripts', 'styles']);

gulp.task('build', ['dist:js', 'dist:css']);