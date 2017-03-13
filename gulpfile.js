
const gulp = require('gulp');
const vulcanize = require('gulp-vulcanize');
const minify = require('gulp-minify-html');

gulp.task('components', () => {
	return gulp.src('./app/frontend/components/*.html')
      .pipe(vulcanize({
  		inlineScripts: true,
  		inlineCss: true
      }))
      .pipe(minify())
      .pipe(gulp.dest('./app/backend/public/components/'));
});

gulp.task('html', () => {
	return gulp.src('./app/frontend/index.html')
		.pipe(minify())
		.pipe(gulp.dest('./app/backend/public/'))
});

gulp.task('watch', () => {
	gulp.watch('./app/frontend/index.html', ['html']);
	gulp.watch('./app/frontend/components/**/*.html', ['components']);
});

gulp.task('default', ['html', 'components', 'watch']);
