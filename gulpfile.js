const gulp = require('gulp')
const babel = require('gulp-babel')

gulp.task('legacyBrowsers', function () {
  return gulp.src('public/*.js')
    .pipe(babel())
    .pipe(gulp.dest('oldBrowsers/'));
})
