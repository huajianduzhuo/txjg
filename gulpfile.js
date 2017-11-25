var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCss = require('gulp-clean-css');

gulp.task('js', function(){
  return gulp.src("src/js/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("build.js"))
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js/"));
});

gulp.task('css', function(){
  return gulp.src("src/css/*.css")
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(gulp.dest("dist/css/"));
});

gulp.task('default', ['js', 'css']);