var gulp = require('gulp'),
	$    = require('gulp-load-plugins')();

gulp.task('scss', function() {
	return gulp.src('./src/scss/**/*.scss')
			.pipe($.sass().on('error', $.sass.logError))
			.pipe($.autoprefixer())
			.pipe($.minifyCss())
			.pipe(gulp.dest('./dist/css'))
			.pipe($.livereload());
});

gulp.task('html', function() {
	return gulp.src('./dist/**/*.html')
			.pipe($.livereload());
});

gulp.task('watch', ['webserver'], function () {
    $.livereload.listen();
    gulp.watch('./src/scss/**/*.scss', ['scss']);
	gulp.watch('./src/scripts/**/*.js', ['scripts']);
	gulp.watch('./dist/**/*.html', ['html']);
});

gulp.task('scripts', function () {
	return gulp.src('./src/scripts/index.js')
			.pipe($.webpack({
				module: {
					loaders: [
						{ test: /\.js$/, loader: 'babel' },
					]					
				},
				output: {
					filename: 'app.min.js',
				}
			}))
			// .pipe($.uglify())
			// .pipe($.rename('app.min.js'))
			.pipe(gulp.dest('./dist/scripts'))
			.pipe($.livereload());
});

gulp.task('webserver', function () {
    $.connect.server({
        port: 8888,
        root: 'dist',
        livereload: true
    });
});

gulp.task('default', ['watch']);
