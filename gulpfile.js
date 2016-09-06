'use strict'

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

gulp.task('lib', function () {
	return gulp.src([
		'node_modules/angular/angular.min.js',
		'node_modules/angular-route/angular-route.min.js',
		'node_modules/angular-sanitize/angular-sanitize.min.js',
		'node_modules/angular-animate/angular-animate.min.js',
		'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
  ])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/lib'));
});


gulp.task('js', function () {
	return gulp.src('js/**/*.js')
		.pipe(concat('app.min.js'))
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('public/js'));
});

gulp.task('css', function () {
	return gulp.src([
		'css/**/*.css',
		'node_modules/bootstrap/dist/css/bootstrap.min.css'
	])
		.pipe(concatCss('main.min.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('public/css'));
});

gulp.task('fonts', function () {
	return gulp.src('node_modules/bootstrap/dist/fonts/*.*')
		.pipe(gulp.dest('public/node_modules/bootstrap/dist/fonts'));
});

gulp.task('template', function () {
	return gulp.src('template/**/*.html')
		.pipe(gulp.dest('public/template'));
});

gulp.task('html', function (){
  return gulp.src('index.html')
    .pipe(gulp.dest('public'));
});

gulp.task('clean', function() {
	return del('public');
});

gulp.task('default', ['lib', 'js', 'css', 'template', 'html', 'fonts']);