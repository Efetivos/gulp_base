var gulp = require ('gulp');
var changed = require ('gulp-changed');
var scss = require ('gulp-sass');
var browserSync = require('browser-sync').create();

//Vars  Changed
var SRC = './scss/*.scss';
var DEST = 'dist';


//HotReaload
gulp.task('serve', ['sass'], function(){
	browserSync.init({
		server: "./"
	})
});

gulp.watch('./scss/*.scss',['sass']);
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
	gulp.watch(SRC, ['sass', 'serve']);
})

gulp.task('default', ['serve']);




















