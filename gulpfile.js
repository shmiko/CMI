'use strict';


var gulp = require('gulp');

var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var autoprefix = require('gulp-autoprefixer');
var sass = require('gulp-sass');

gulp.paths = {
  src: 'client/',
  dist: 'dist/'
};

var bases = {
    app:  'client/',
    dist: 'dist/',
    sass: 'client/sass/',
    css:  'client/sass/',
    less: 'client/less/', 
};

var paths = {
 scripts: ['client/app/**/*.js', '!client/app/libs/**/*.min.js'],
 libs: ['bower_components/**/*.js', '!bower_components/**/*.min.js'],
 styles: ['client/app/**/*.css','client/content/css/*.css'],
 html: ['client/app/**/*.html'],
 images: ['client/content/images/*.png','client/content/images/*.jpg'],
 extras: ['client/favicon.ico'],
};

// gulp.task('minify', function () {
//    gulp.src(src + 'app/**/*.js')
//       .pipe(uglify())
//       .pipe(gulp.dest(dist))
// });

gulp.task('buildjs', function () {
   return gulp.src([bases.app + '/**/*.js', bases.app + '!/**/*.min.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concat('app.js'))
      .pipe(gulp.dest(bases.dist));
});

gulp.task('less', function () {
   gulp.src('client/app/**/*.less', { base: 'client/app' })
      .pipe(less())
      .pipe(autoprefix('last 2 version', 'ie 8', 'ie 9'))
      .pipe(gulp.dest('client/app'));
});



gulp.task('sass', function() {
    gulp.src(bases.app + 'app/**/*.scss',bases.app + '/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefix('last 2 version', 'ie 8', 'ie 9'))
        .pipe(gulp.dest(bases.app));
});

gulp.task('sassy', function (done) {
  sass.render({
    file: 'client/sass/test.scss',
    success: function () { done() }
  });
});

 // Copy styles
gulp.task('css', function() {
 gulp.src(bases.app + '/**/*.css')
 .pipe(gulp.dest(bases.css));
});
// Delete the dist directory
// gulp.task('clean', function() {
//  return gulp.src(bases.dist)
//  .pipe(clean());
// });

// Process scripts and concatenate them into one output file
// gulp.task('scripts', function() {
//  gulp.src(paths.scripts, {cwd: bases.app})
//  .pipe(jshint())
//  .pipe(jshint.reporter('default'))
//  .pipe(uglify())
//  .pipe(concat('app.min.js'))
//  .pipe(gulp.dest(bases.dist + 'scripts/'));
// });

// Imagemin images and ouput them in dist
gulp.task('imagemin', function() {
 gulp.src('client/content/**/*.js')
 .pipe(imagemin())
 .pipe(gulp.dest(bases.dist + 'images/'));
});

// Copy all other files to dist directly
gulp.task('copy', function() {
//copy index.html
 gulp.src('client/index.html')
 .pipe(gulp.dest(bases.dist));

 // Copy html
 gulp.src(bases.app + '/**/*.html')
 .pipe(gulp.dest(bases.dist));


 // // Copy lib scripts, maintaining the original directory structure
 // gulp.src(['bower_components/**/*.js', '!bower_components/**/*.min.js'])
 // .pipe(gulp.dest(bases.dist + 'bower_components/'));

 // Copy extra html5bp files
 gulp.src('client/favicon.ico')
 .pipe(gulp.dest(bases.dist));
});

// A development task to run anytime a file changes
gulp.task('watch', function() {
 gulp.watch('app/**/*', ['scripts', 'copy']);
});

// Define the default task as a sequence of the above tasks
gulp.task('default', ['less','buildjs', 'imagemin', 'copy']);





