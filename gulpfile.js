var gulp       = require('gulp'),
    concat  = require('gulp-concat'),
    replace = require('gulp-replace');
var merge = require('merge-stream');
var fs = require('fs');

gulp.task('homebrew', function() {
  var outlaw_version = fs.readFileSync('./VERSION').toString().trim();
  return gulp.src(['outlaw.rb'])
     .pipe(replace("OUTLAW_VERSION = ''", 'OUTLAW_VERSION = "' + outlaw_version + '"'))
     .pipe(gulp.dest('dist'))
});

gulp.task('docker-osx-dev', function() {
  return gulp.src(['modules/docker-osx-dev'])
     .pipe(replace('handle_command "$@"', ''))
     .pipe(gulp.dest('tmp'))
});

gulp.task('cowboy', ['docker-osx-dev'], function() {
  return gulp.src(['lib/cowboy'])
     .pipe(concat('cowboy'))
     .pipe(gulp.dest('tmp'))
});

gulp.task('build', ['cowboy'], function() {
  return gulp.src(['tmp/docker-osx-dev', 'tmp/cowboy'])
     .pipe(concat('outlaw'))
     .pipe(gulp.dest('dist'))
});

gulp.task('default', ['build', 'homebrew'], function(){});
