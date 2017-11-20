var gulp = require('gulp'),
	concat = require('gulp-concat'),// конкатенирует js файлы
	uglify = require('gulp-uglify'), // минифицирует js файлы
	/*concatcss = require('gulp-concat-css'), // конкатенирует css файлы
	cssmin = require('gulp-cssmin'),*/// минифицирует css файлы
	rename = require('gulp-rename'); //переименовывает результирующий файл, вставляет суффикс перед расширением

/*gulp.task('concat', function(){
	return gulp.src('./public/css/*.css')
	.pipe(concatcss('bundle.css'))
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./public/prodaction/'));
});*/
 
gulp.task('build', function() {
  return gulp.src(['./public/js/_block/*.js', './public/js/*.js']) //где взять все js-файлы, которые нужно собрать
    .pipe(concat('bundle.min.js')) // так будет называться результирующий файл
    //.pipe(uglify()) // минифицируем результирующий файл
	//.pipe(rename({suffix: '.min'})) //переименовывает результирующий файл, вставляет суффикс .min перед расширением .js
    .pipe(gulp.dest('./public/prodaction/')); // сюда положить результирующий файл
});

