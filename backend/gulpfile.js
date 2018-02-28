const gulp = require('gulp')
const babel = require('gulp-babel')
const mocha = require('gulp-mocha')
const gutil = require('gulp-util')

gulp.task('babel', function(){
    return gulp.src('src/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist'))
});

gulp.task('mocha', ['babel'], () => {
	return gulp.src(['dist/test/*.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
})

gulp.task('default', ['babel']);