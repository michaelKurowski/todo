const gulp = require('gulp')
const babel = require('gulp-babel')

gulp.task('babel', function () {
  return gulp.src('publicDev/*.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('public/'))
})
gulp.task('html', function () {
  return gulp.src('publicDev/*.html')
    .pipe(gulp.dest('public/'))
})
gulp.task('css', function () {
  return gulp.src('publicDev/*.css')
    .pipe(gulp.dest('public/'))
})

gulp.task('watch:css', () => gulp.watch('publicDev/*.css', ['css']))
gulp.task('watch:js', () => gulp.watch('publicDev/*.js', ['babel']))
gulp.task('watch:html', () => gulp.watch('publicDev/*.html', ['html']))

gulp.task('default', () => gulp.start('watch:css', 'watch:js', 'watch:html'))