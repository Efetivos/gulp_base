var gulp = require ('gulp');
var changed = require ('gulp-changed');
var scss = require ('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require ('gulp-uglify');
var minifyCSS = require ('gulp-minify-css');
var pug = require('gulp-pug');

//Vars  Changed
var SRC = './scss/*.scss';
var DEST = 'dist';


//PUG
gulp.task('views', function buildHTML() {
	return gulp.src('pug/*.pug')
	.pipe(pug({
	  pretty: true
	}))
	.pipe(gulp.dest('./'))
  });

  
//HotReaload
gulp.task('serve', ['sass','views'], function(){
	browserSync.init({
		server: "./"
	})
});


//Watch
gulp.watch('./scss/*.scss',['sass']);
gulp.watch('./pug/*.pug',['views']);
gulp.watch('./js/*js').on('change', browserSync.reload);
gulp.watch('./*html').on('change', browserSync.reload);


//Scss
gulp.task('sass', function() {
 gulp.src('scss/*.scss')
	.pipe(scss())
	.pipe(gulp.dest('css'))
	.pipe(browserSync.stream());;
});


//Changed
gulp.task('changed', function (){
	return gulp.src(SRC)
	.pipe(changed(DEST))
	.pipe(gulp.dest(DEST));
});


gulp.task('watch', function(){
	gulp.watch(SRC, ['sass', 'serve','views']);
})


//Uglify Js
gulp.task('ugly', function() {
	return gulp.src('./js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('minified-js'));

});

//Minify Css
gulp.task('minify-css', function() {
	gulp.src('./css/*.css')
	.pipe(minifyCSS({keepSpecialComments:1}))
	.pipe(gulp.dest('minified-css'));

});


gulp.task('default', ['serve','views']);




















