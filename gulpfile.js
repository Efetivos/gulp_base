var gulp = require ('gulp');
var changed = require ('gulp-changed');
var sass = require ('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require ('gulp-uglify');
var pug = require('gulp-pug');
var concat = require('gulp-concat');

//Vars  Changed
var SRC = './sass/**/*.sass';
var DEST = 'dist';


//PUG
gulp.task('views', function buildHTML() {
	return gulp.src('pug/**/*.pug')
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
gulp.watch('./sass/**/*.sass',['sass']);
gulp.watch('./pug/**/*.pug',['views']);
gulp.watch('./js/requires/*.js',['concat']);
gulp.watch(['./pug/**/*.pug','*.php','./partials/**/*.php' ]).on('change', browserSync.reload);
gulp.watch('./js/*js').on('change', browserSync.reload);
gulp.watch('./*html').on('change', browserSync.reload);


//sass
gulp.task('sass', function() {
 gulp.src('sass/*.sass')
	.pipe(sass({outputStyle:'compressed'}))
	.pipe(gulp.dest('css'))
	.pipe(browserSync.stream());
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
	.pipe(gulp.dest('minified-js'));

});

//Concat
gulp.task('concat', function() {
	return gulp.src('./js/requires/*.js')
	.pipe(concat('main.js'))
	.pipe(gulp.dest('js'));
});

gulp.task('default', ['serve','views','concat']);

